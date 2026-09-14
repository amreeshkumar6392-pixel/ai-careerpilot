import React, { useEffect, useState } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate, useParams } from "react-router";
import "../style/interview.scss";


/* =========================================================
   NAVIGATION ITEMS
========================================================= */

const NAV_ITEMS = [
    {
        id: "technical",
        label: "Technical",
        fullLabel: "Technical Questions",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        )
    },
    {
        id: "behavioral",
        label: "Behavioral",
        fullLabel: "Behavioral Questions",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        )
    },
    {
        id: "roadmap",
        label: "Roadmap",
        fullLabel: "Preparation Roadmap",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
        )
    }
];


/* =========================================================
   ICONS
========================================================= */

const BackIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);


const DownloadIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
    </svg>
);


const SparkleIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
    </svg>
);


/* =========================================================
   QUESTION CARD
========================================================= */

const QuestionCard = ({ item, index }) => {

    const [open, setOpen] = useState(false);

    return (
        <article
            className={`q-card ${open ? "q-card--open" : ""}`}
        >

            <button
                type="button"
                className="q-card__header"
                onClick={() => setOpen((current) => !current)}
                aria-expanded={open}
            >

                <span className="q-card__number">
                    {String(index + 1).padStart(2, "0")}
                </span>


                <span className="q-card__content">

                    <span className="q-card__eyebrow">
                        QUESTION {index + 1}
                    </span>

                    <span className="q-card__question">
                        {item.question}
                    </span>

                </span>


                <span className="q-card__toggle">

                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>

                </span>

            </button>


            {open && (

                <div className="q-card__body">

                    <div className="answer-block">

                        <div className="answer-block__heading">

                            <span className="answer-icon answer-icon--intention">
                                ?
                            </span>

                            <div>
                                <span className="answer-block__label">
                                    Interviewer Intention
                                </span>

                                <span className="answer-block__hint">
                                    What this question evaluates
                                </span>
                            </div>

                        </div>


                        <p>
                            {item.intention}
                        </p>

                    </div>


                    <div className="answer-block answer-block--model">

                        <div className="answer-block__heading">

                            <span className="answer-icon answer-icon--answer">
                                ✓
                            </span>

                            <div>
                                <span className="answer-block__label">
                                    Model Answer
                                </span>

                                <span className="answer-block__hint">
                                    A strong way to approach this question
                                </span>
                            </div>

                        </div>


                        <p>
                            {item.answer}
                        </p>

                    </div>

                </div>

            )}

        </article>
    );
};


/* =========================================================
   ROADMAP DAY
========================================================= */

const RoadMapDay = ({ day, index, total }) => (

    <article className="roadmap-card">

        <div className="roadmap-card__timeline">

            <span className="roadmap-card__dot">
                {String(index + 1).padStart(2, "0")}
            </span>

            {index !== total - 1 && (
                <span className="roadmap-card__line"></span>
            )}

        </div>


        <div className="roadmap-card__content">

            <div className="roadmap-card__top">

                <div>

                    <span className="roadmap-card__day">
                        DAY {day.day}
                    </span>

                    <h3>
                        {day.focus}
                    </h3>

                </div>

            </div>


            <ul>

                {day.tasks.map((task, taskIndex) => (

                    <li key={taskIndex}>

                        <span className="roadmap-task-check">
                            ✓
                        </span>

                        <span>
                            {task}
                        </span>

                    </li>

                ))}

            </ul>

        </div>

    </article>
);


/* =========================================================
   EMPTY STATE
========================================================= */

const EmptyState = ({ title, description }) => (

    <div className="empty-state">

        <div className="empty-state__icon">
            ✦
        </div>

        <h3>
            {title}
        </h3>

        <p>
            {description}
        </p>

    </div>
);


/* =========================================================
   MAIN COMPONENT
========================================================= */

const Interview = () => {

    const [activeNav, setActiveNav] = useState("technical");

    const {
        report,
        getReportById,
        loading,
        getResumePdf
    } = useInterview();

    const { interviewId } = useParams();

    const navigate = useNavigate();


    /* =====================================================
       LOAD REPORT
    ===================================================== */

    useEffect(() => {

        if (interviewId) {
            getReportById(interviewId);
        }

    }, [interviewId]);


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading || !report) {

        return (

            <main className="interview-loading">

                <div className="loading-orb">
                    <SparkleIcon />
                </div>

                <h1>
                    Preparing your interview report
                </h1>

                <p>
                    Analyzing your profile and preparation strategy...
                </p>

                <div className="loading-bar">
                    <span></span>
                </div>

            </main>

        );
    }


    /* =====================================================
       SCORE
    ===================================================== */

    const score = Number(report.matchScore) || 0;

    const scoreLevel =
        score >= 80
            ? "high"
            : score >= 60
                ? "medium"
                : "low";


    const scoreMessage =
        score >= 80
            ? "Excellent match"
            : score >= 60
                ? "Good match"
                : "Needs improvement";


    const technicalQuestions =
        report.technicalQuestions || [];

    const behavioralQuestions =
        report.behavioralQuestions || [];

    const preparationPlan =
        report.preparationPlan || [];

    const skillGaps =
        report.skillGaps || [];


    /* =====================================================
       CURRENT SECTION TITLE
    ===================================================== */

    const activeItem =
        NAV_ITEMS.find((item) => item.id === activeNav);


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <div className="interview-page">

            <div className="interview-shell">


                {/* =================================================
                    HEADER
                ================================================= */}

                <header className="interview-header">

                    <button
                        type="button"
                        className="back-dashboard"
                        onClick={() => navigate("/dashboard")}
                    >

                        <BackIcon />

                        <span>
                            Dashboard
                        </span>

                    </button>


                    <div className="interview-header__center">

                        <div className="header-brand-mark">
                            ✦
                        </div>

                        <div>

                            <span>
                                AI INTERVIEW PREP
                            </span>

                            <strong>
                                Interview Report
                            </strong>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="download-resume"
                        onClick={() => getResumePdf(interviewId)}
                    >

                        <DownloadIcon />

                        <span>
                            Download Resume
                        </span>

                    </button>

                </header>


                {/* =================================================
                    REPORT HERO
                ================================================= */}

                <section className="report-hero">

                    <div className="report-hero__copy">

                        <span className="report-eyebrow">
                            ✦ AI-GENERATED INTERVIEW ANALYSIS
                        </span>

                        <h1>
                            Your Interview
                            <span>
                                Preparation Report
                            </span>
                        </h1>

                        <p>
                            Review the questions, skill gaps and preparation
                            roadmap generated specifically for your target role.
                        </p>

                    </div>


                    {/* Score Card */}

                    <div className={`score-card score-card--${scoreLevel}`}>

                        <div className="score-card__info">

                            <span className="score-card__label">
                                MATCH SCORE
                            </span>

                            <strong>
                                {score}%
                            </strong>

                            <span className="score-card__message">
                                {scoreMessage}
                            </span>

                        </div>


                        <div className="score-ring">

                            <div className="score-ring__inner">

                                <SparkleIcon />

                                <span>
                                    AI
                                </span>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    MOBILE / DESKTOP SECTION NAV
                ================================================= */}

                <nav className="section-tabs">

                    {NAV_ITEMS.map((item) => (

                        <button
                            type="button"
                            key={item.id}
                            className={
                                activeNav === item.id
                                    ? "section-tab section-tab--active"
                                    : "section-tab"
                            }
                            onClick={() => setActiveNav(item.id)}
                        >

                            <span className="section-tab__icon">
                                {item.icon}
                            </span>

                            <span className="section-tab__label">

                                <span className="section-tab__desktop-label">
                                    {item.fullLabel}
                                </span>

                                <span className="section-tab__mobile-label">
                                    {item.label}
                                </span>

                            </span>

                        </button>

                    ))}

                </nav>


                {/* =================================================
                    CONTENT GRID
                ================================================= */}

                <div className="report-grid">


                    {/* =================================================
                        MAIN CONTENT
                    ================================================= */}

                    <main className="report-main">

                        <div className="section-heading">

                            <div>

                                <span>
                                    {activeNav === "technical"
                                        ? "TECHNICAL ASSESSMENT"
                                        : activeNav === "behavioral"
                                            ? "BEHAVIORAL ASSESSMENT"
                                            : "PERSONALIZED PLAN"
                                    }
                                </span>

                                <h2>
                                    {activeItem?.fullLabel}
                                </h2>

                            </div>


                            {activeNav !== "roadmap" && (

                                <span className="question-count">

                                    {activeNav === "technical"
                                        ? technicalQuestions.length
                                        : behavioralQuestions.length
                                    }

                                    <small>
                                        questions
                                    </small>

                                </span>

                            )}

                            {activeNav === "roadmap" && (

                                <span className="question-count">

                                    {preparationPlan.length}

                                    <small>
                                        days
                                    </small>

                                </span>

                            )}

                        </div>


                        {/* =================================================
                            TECHNICAL
                        ================================================= */}

                        {activeNav === "technical" && (

                            technicalQuestions.length > 0 ? (

                                <div className="question-list">

                                    {technicalQuestions.map(
                                        (question, index) => (

                                            <QuestionCard
                                                key={index}
                                                item={question}
                                                index={index}
                                            />

                                        )
                                    )}

                                </div>

                            ) : (

                                <EmptyState
                                    title="No technical questions"
                                    description="No technical questions were generated for this report."
                                />

                            )

                        )}


                        {/* =================================================
                            BEHAVIORAL
                        ================================================= */}

                        {activeNav === "behavioral" && (

                            behavioralQuestions.length > 0 ? (

                                <div className="question-list">

                                    {behavioralQuestions.map(
                                        (question, index) => (

                                            <QuestionCard
                                                key={index}
                                                item={question}
                                                index={index}
                                            />

                                        )
                                    )}

                                </div>

                            ) : (

                                <EmptyState
                                    title="No behavioral questions"
                                    description="No behavioral questions were generated for this report."
                                />

                            )

                        )}


                        {/* =================================================
                            ROADMAP
                        ================================================= */}

                        {activeNav === "roadmap" && (

                            preparationPlan.length > 0 ? (

                                <div className="roadmap-list">

                                    {preparationPlan.map(
                                        (day, index) => (

                                            <RoadMapDay
                                                key={day.day || index}
                                                day={day}
                                                index={index}
                                                total={preparationPlan.length}
                                            />

                                        )
                                    )}

                                </div>

                            ) : (

                                <EmptyState
                                    title="No preparation roadmap"
                                    description="A preparation roadmap was not generated for this report."
                                />

                            )

                        )}

                    </main>


                    {/* =================================================
                        RIGHT INSIGHTS
                    ================================================= */}

                    <aside className="report-insights">


                        {/* Score */}

                        <section className="insight-card insight-score">

                            <div className="insight-card__heading">

                                <div>

                                    <span>
                                        YOUR SCORE
                                    </span>

                                    <h3>
                                        Match Analysis
                                    </h3>

                                </div>

                                <span className="insight-sparkle">
                                    ✦
                                </span>

                            </div>


                            <div className="insight-score__value">

                                <strong>
                                    {score}
                                </strong>

                                <span>
                                    / 100
                                </span>

                            </div>


                            <div className="insight-progress">

                                <span
                                    style={{
                                        width: `${Math.min(score, 100)}%`
                                    }}
                                ></span>

                            </div>


                            <p>
                                {score >= 80
                                    ? "Your profile aligns strongly with the requirements of this role."
                                    : score >= 60
                                        ? "You have a solid foundation, but there are areas worth improving."
                                        : "Focus on the identified skill gaps before your interview."
                                }
                            </p>

                        </section>


                        {/* Skill Gaps */}

                        <section className="insight-card">

                            <div className="insight-card__heading">

                                <div>

                                    <span>
                                        AREAS TO IMPROVE
                                    </span>

                                    <h3>
                                        Skill Gaps
                                    </h3>

                                </div>

                                <span className="gap-count">
                                    {skillGaps.length}
                                </span>

                            </div>


                            {skillGaps.length > 0 ? (

                                <div className="skill-gap-list">

                                    {skillGaps.map((gap, index) => (

                                        <div
                                            key={index}
                                            className={`skill-gap skill-gap--${gap.severity}`}
                                        >

                                            <div className="skill-gap__icon">
                                                {gap.severity === "high"
                                                    ? "!"
                                                    : gap.severity === "medium"
                                                        ? "!"
                                                        : "✓"
                                                }
                                            </div>

                                            <div className="skill-gap__content">

                                                <strong>
                                                    {gap.skill}
                                                </strong>

                                                <span>
                                                    {gap.severity === "high"
                                                        ? "High priority"
                                                        : gap.severity === "medium"
                                                            ? "Needs attention"
                                                            : "Minor gap"
                                                    }
                                                </span>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            ) : (

                                <p className="no-gaps">
                                    No major skill gaps identified.
                                </p>

                            )}

                        </section>


                        {/* Preparation Summary */}

                        <section className="insight-card preparation-summary">

                            <div className="insight-card__heading">

                                <div>

                                    <span>
                                        PREPARATION
                                    </span>

                                    <h3>
                                        Your Plan
                                    </h3>

                                </div>

                                <span className="plan-icon">
                                    →
                                </span>

                            </div>


                            <div className="summary-row">

                                <div>
                                    <strong>
                                        {technicalQuestions.length}
                                    </strong>

                                    <span>
                                        Technical
                                    </span>
                                </div>


                                <div>
                                    <strong>
                                        {behavioralQuestions.length}
                                    </strong>

                                    <span>
                                        Behavioral
                                    </span>
                                </div>


                                <div>
                                    <strong>
                                        {preparationPlan.length}
                                    </strong>

                                    <span>
                                        Days
                                    </span>
                                </div>

                            </div>

                        </section>


                        {/* Mobile Resume */}

                        <button
                            type="button"
                            className="mobile-download"
                            onClick={() => getResumePdf(interviewId)}
                        >

                            <DownloadIcon />

                            Download Resume

                        </button>

                    </aside>

                </div>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <footer className="interview-footer">

                    <span>
                        ✦ AI Interview Prep
                    </span>

                    <span>
                        Personalized for your next opportunity
                    </span>

                </footer>

            </div>

        </div>
    );
};


export default Interview;