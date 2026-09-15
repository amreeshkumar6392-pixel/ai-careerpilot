const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

/*
 * Number of times Gemini will be retried when a temporary
 * service error occurs.
 */
const MAX_RETRIES = 3;

/*
 * Wait before trying Gemini again.
 */
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/*
 * Generate content with automatic retry for temporary
 * Gemini availability/rate-limit/server errors.
 */
async function generateWithRetry(request) {
    let lastError;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            console.log(
                `Gemini request attempt ${attempt}/${MAX_RETRIES}`
            );

            const response = await ai.models.generateContent(request);

            console.log("Gemini request successful");

            return response;
        } catch (error) {
            lastError = error;

            const errorMessage =
                error?.message ||
                error?.toString() ||
                "";

            const errorStatus =
                error?.status ||
                error?.code ||
                "";

            const isTemporaryError =
                errorStatus === 429 ||
                errorStatus === 500 ||
                errorStatus === 502 ||
                errorStatus === 503 ||
                errorStatus === 504 ||
                errorMessage.includes("503") ||
                errorMessage.includes("UNAVAILABLE") ||
                errorMessage.includes("high demand") ||
                errorMessage.includes("temporarily");

            console.error(
                `Gemini request failed on attempt ${attempt}:`,
                errorMessage
            );

            /*
             * If the error is not temporary, don't retry it.
             */
            if (!isTemporaryError) {
                throw error;
            }

            /*
             * If this was the final attempt, stop retrying.
             */
            if (attempt === MAX_RETRIES) {
                break;
            }

            /*
             * Exponential backoff:
             *
             * Attempt 1 → wait 2 seconds
             * Attempt 2 → wait 4 seconds
             * Attempt 3 → final attempt
             */
            const delay = 2000 * Math.pow(2, attempt - 1);

            console.log(
                `Gemini temporarily unavailable. Retrying in ${
                    delay / 1000
                } seconds...`
            );

            await wait(delay);
        }
    }

    /*
     * Give the controller a clear error after all retries fail.
     */
    const finalError = new Error(
        "AI service is temporarily unavailable. Please try again in a moment."
    );

    finalError.status = 503;
    finalError.cause = lastError;

    throw finalError;
}


/*
 * Interview report schema
 */
const interviewReportSchema = z.object({
    matchScore: z
        .number()
        .describe(
            "A score between 0 and 100 indicating how well the candidate's profile matches the job description"
        ),

    technicalQuestions: z
        .array(
            z.object({
                question: z
                    .string()
                    .describe(
                        "The technical question that can be asked in the interview"
                    ),

                intention: z
                    .string()
                    .describe(
                        "The intention of the interviewer behind asking this question"
                    ),

                answer: z
                    .string()
                    .describe(
                        "How to answer this question, what points to cover, what approach to take, etc."
                    )
            })
        )
        .describe(
            "Technical questions that can be asked in the interview along with their intention and how to answer them"
        ),

    behavioralQuestions: z
        .array(
            z.object({
                question: z
                    .string()
                    .describe(
                        "The behavioral question that can be asked in the interview"
                    ),

                intention: z
                    .string()
                    .describe(
                        "The intention of the interviewer behind asking this question"
                    ),

                answer: z
                    .string()
                    .describe(
                        "How to answer this question, what points to cover, what approach to take, etc."
                    )
            })
        )
        .describe(
            "Behavioral questions that can be asked in the interview along with their intention and how to answer them"
        ),

    skillGaps: z
        .array(
            z.object({
                skill: z
                    .string()
                    .describe(
                        "The skill which the candidate is lacking"
                    ),

                severity: z
                    .enum(["low", "medium", "high"])
                    .describe(
                        "The severity of this skill gap, i.e. how important this skill is for the job and how much it can impact the candidate's chances"
                    )
            })
        )
        .describe(
            "List of skill gaps in the candidate's profile along with their severity"
        ),

    preparationPlan: z
        .array(
            z.object({
                day: z
                    .number()
                    .describe(
                        "The day number in the preparation plan, starting from 1"
                    ),

                focus: z
                    .string()
                    .describe(
                        "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews, etc."
                    ),

                tasks: z
                    .array(z.string())
                    .describe(
                        "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video, etc."
                    )
            })
        )
        .describe(
            "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"
        ),

    title: z
        .string()
        .describe(
            "The title of the job for which the interview report is generated"
        )
});


/**
 * Generate AI interview report
 */
async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {
    const prompt = `Generate an interview report for a candidate with the following details:

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

    const response = await generateWithRetry({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(
                interviewReportSchema
            )
        }
    });

    return JSON.parse(response.text);
}


/**
 * Convert HTML content into PDF using Puppeteer
 */
async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ]
    });

    try {
        const page = await browser.newPage();

        await page.setContent(htmlContent, {
            waitUntil: "networkidle0"
        });

        const pdfBuffer = await page.pdf({
            format: "A4",
            margin: {
                top: "20mm",
                bottom: "20mm",
                left: "15mm",
                right: "15mm"
            }
        });

        return pdfBuffer;
    } finally {
        await browser.close();
    }
}


/**
 * Generate ATS-friendly resume PDF
 * using Gemini + Puppeteer
 */
async function generateResumePdf({
    resume,
    selfDescription,
    jobDescription
}) {
    const resumePdfSchema = z.object({
        html: z
            .string()
            .describe(
                "The HTML content of the resume which can be converted to PDF using Puppeteer"
            )
    });

    const prompt = `Generate a resume for a candidate with the following details:

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

The response should be a JSON object with a single field "html" which contains the HTML content of the resume that can be converted to PDF using Puppeteer.

The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience.

The content of the resume should not sound like it was generated by AI and should be as close as possible to a real human-written resume.

You can highlight the content using some colors or different font styles, but the overall design should be simple and professional.

The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.

The resume should ideally be 1-2 pages long when converted to PDF.

Focus on quality rather than quantity and include relevant information that can increase the candidate's chances of getting an interview call for the given job.

The HTML should be well-formatted and structured, making it easy to read and visually appealing.
`;

    const response = await generateWithRetry({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(
                resumePdfSchema
            )
        }
    });

    const jsonContent = JSON.parse(response.text);

    const pdfBuffer = await generatePdfFromHtml(
        jsonContent.html
    );

    return pdfBuffer;
}


module.exports = {
    generateInterviewReport,
    generateResumePdf
};