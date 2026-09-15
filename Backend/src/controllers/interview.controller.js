const pdfParse = require("pdf-parse");
const {
    generateInterviewReport,
    generateResumePdf
} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");


/**
 * @description Controller to generate interview report based on
 * user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a resume PDF."
            });
        }

        const resumeContent = await (
            new pdfParse.PDFParse(
                Uint8Array.from(req.file.buffer)
            )
        ).getText();

        const { selfDescription, jobDescription } = req.body;

        if (!selfDescription || !jobDescription) {
            return res.status(400).json({
                message:
                    "Please provide self description and job description."
            });
        }

        const interViewReportByAi =
            await generateInterviewReport({
                resume: resumeContent.text,
                selfDescription,
                jobDescription
            });

        const interviewReport =
            await interviewReportModel.create({
                user: req.user.id,
                resume: resumeContent.text,
                selfDescription,
                jobDescription,
                ...interViewReportByAi
            });

        return res.status(201).json({
            message:
                "Interview report generated successfully.",
            interviewReport
        });

    } catch (error) {
        console.error(
            "Generate interview report error:",
            error
        );

        if (error.status === 503) {
            return res.status(503).json({
                message:
                    "AI service is temporarily unavailable. Please try again in a moment."
            });
        }

        return res.status(500).json({
            message:
                "Failed to generate interview report."
        });
    }
}


/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params;

        const interviewReport =
            await interviewReportModel.findOne({
                _id: interviewId,
                user: req.user.id
            });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            });
        }

        return res.status(200).json({
            message:
                "Interview report fetched successfully.",
            interviewReport
        });

    } catch (error) {
        console.error(
            "Get interview report error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to fetch interview report."
        });
    }
}


/**
 * @description Controller to get all interview reports
 * of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports =
            await interviewReportModel
                .find({ user: req.user.id })
                .sort({ createdAt: -1 })
                .select(
                    "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan"
                );

        return res.status(200).json({
            message:
                "Interview reports fetched successfully.",
            interviewReports
        });

    } catch (error) {
        console.error(
            "Get all interview reports error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to fetch interview reports."
        });
    }
}


/**
 * @description Controller to generate resume PDF based on
 * user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params;

        const interviewReport =
            await interviewReportModel.findOne({
                _id: interviewReportId,
                user: req.user.id
            });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            });
        }

        const {
            resume,
            jobDescription,
            selfDescription
        } = interviewReport;

        const pdfBuffer = await generateResumePdf({
            resume,
            jobDescription,
            selfDescription
        });

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition":
                `attachment; filename=resume_${interviewReportId}.pdf`,
            "Content-Length": pdfBuffer.length
        });

        return res.send(pdfBuffer);

    } catch (error) {
        console.error(
            "Generate resume PDF error:",
            error
        );

        if (error.status === 503) {
            return res.status(503).json({
                message:
                    "AI service is temporarily unavailable. Please try again in a moment."
            });
        }

        return res.status(500).json({
            message:
                "Failed to generate resume PDF."
        });
    }
}


module.exports = {
    generateInterViewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
};