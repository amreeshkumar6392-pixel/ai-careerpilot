import React from "react";
import { useNavigate } from "react-router";
import "../style/landing.scss";

const Landing = () => {

    const navigate = useNavigate();

    return (
        <main className="landing-page">

            {/* =================================================
                NAVBAR
            ================================================= */}

            <nav className="landing-nav">

                <button
                    className="landing-logo"
                    onClick={() => navigate("/")}
                >
                    <span className="logo-mark">✦</span>

                    <span>
                        AI Interview Prep
                    </span>
                </button>


                <div className="nav-center">

                    <a href="#features">
                        Features
                    </a>

                    <a href="#how-it-works">
                        How it works
                    </a>

                    <a href="#preview">
                        Preview
                    </a>

                </div>


                <div className="nav-actions">

                    <button
                        className="nav-login"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                    <button
                        className="nav-register"
                        onClick={() => navigate("/register")}
                    >
                        Get Started
                        <span>→</span>
                    </button>

                </div>

            </nav>


            {/* =================================================
                HERO
            ================================================= */}

            <section className="hero-section">

                <div className="hero-glow hero-glow--one"></div>
                <div className="hero-glow hero-glow--two"></div>


                <div className="hero-content">

                    <div className="hero-badge">

                        <span className="badge-dot"></span>

                        AI-POWERED INTERVIEW PREPARATION

                    </div>


                    <h1>

                        Your next interview.

                        <span>
                            Prepared by AI.
                        </span>

                    </h1>


                    <p className="hero-description">

                        Turn a job description and your resume into a
                        personalized interview strategy, targeted questions,
                        skill analysis and a preparation roadmap.

                    </p>


                    <div className="hero-buttons">

                        <button
                            className="hero-primary"
                            onClick={() => navigate("/register")}
                        >

                            <span>
                                Start Preparing
                            </span>

                            <span className="button-arrow">
                                →
                            </span>

                        </button>


                        <button
                            className="hero-secondary"
                            onClick={() => navigate("/login")}
                        >

                            Already have an account?

                            <span>
                                Login
                            </span>

                        </button>

                    </div>


                    <div className="hero-trust">

                        <div>
                            <span>✓</span>
                            Resume analysis
                        </div>

                        <div>
                            <span>✓</span>
                            Job-specific questions
                        </div>

                        <div>
                            <span>✓</span>
                            Personalized roadmap
                        </div>

                    </div>

                </div>


                {/* =================================================
                    PRODUCT PREVIEW
                ================================================= */}

                <div
                    className="hero-product"
                    id="preview"
                >

                    <div className="product-window">

                        {/* Window header */}

                        <div className="product-topbar">

                            <div className="window-dots">

                                <span></span>
                                <span></span>
                                <span></span>

                            </div>


                            <div className="window-title">
                                AI Interview Prep
                            </div>


                            <div className="window-status">

                                <span></span>

                                AI Ready

                            </div>

                        </div>


                        {/* Product content */}

                        <div className="product-body">

                            {/* Sidebar */}

                            <aside className="product-sidebar">

                                <div className="sidebar-brand">
                                    <span>✦</span>
                                    Interview Prep
                                </div>


                                <div className="sidebar-item sidebar-item--active">
                                    <span>▦</span>
                                    Dashboard
                                </div>

                                <div className="sidebar-item">
                                    <span>◉</span>
                                    Interview Plans
                                </div>

                                <div className="sidebar-item">
                                    <span>↗</span>
                                    Preparation
                                </div>

                            </aside>


                            {/* Dashboard preview */}

                            <div className="product-main">

                                <div className="preview-heading">

                                    <div>

                                        <span>
                                            INTERVIEW PLAN
                                        </span>

                                        <h3>
                                            Frontend Developer
                                        </h3>

                                    </div>


                                    <div className="preview-badge">
                                        AI Generated
                                    </div>

                                </div>


                                {/* Score */}

                                <div className="preview-grid">

                                    <div className="score-card">

                                        <div className="score-card__top">

                                            <span>
                                                MATCH SCORE
                                            </span>

                                            <span className="score-icon">
                                                ✦
                                            </span>

                                        </div>


                                        <div className="score-value">
                                            84<span>%</span>
                                        </div>


                                        <div className="score-bar">

                                            <div
                                                className="score-bar__fill"
                                            ></div>

                                        </div>


                                        <p>
                                            Strong match for this role
                                        </p>

                                    </div>


                                    {/* Questions */}

                                    <div className="questions-card">

                                        <div className="mini-card-title">
                                            <span>
                                                INTERVIEW FOCUS
                                            </span>

                                            <strong>
                                                24 questions
                                            </strong>
                                        </div>


                                        <div className="question-row">

                                            <span className="question-number">
                                                01
                                            </span>

                                            <div>
                                                <strong>
                                                    React & JavaScript
                                                </strong>

                                                <small>
                                                    Technical
                                                </small>
                                            </div>

                                            <span className="question-check">
                                                ✓
                                            </span>

                                        </div>


                                        <div className="question-row">

                                            <span className="question-number">
                                                02
                                            </span>

                                            <div>
                                                <strong>
                                                    System Design
                                                </strong>

                                                <small>
                                                    Technical
                                                </small>
                                            </div>

                                            <span className="question-check question-check--warning">
                                                !
                                            </span>

                                        </div>


                                        <div className="question-row">

                                            <span className="question-number">
                                                03
                                            </span>

                                            <div>
                                                <strong>
                                                    Behavioral
                                                </strong>

                                                <small>
                                                    Communication
                                                </small>
                                            </div>

                                            <span className="question-check">
                                                ✓
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                {/* Skills */}

                                <div className="skills-card">

                                    <div className="skills-header">

                                        <div>

                                            <span>
                                                SKILL ANALYSIS
                                            </span>

                                            <strong>
                                                Your preparation focus
                                            </strong>

                                        </div>

                                        <span>
                                            View report →
                                        </span>

                                    </div>


                                    <div className="skills-list">

                                        <div className="skill">

                                            <div className="skill-info">
                                                <span>React.js</span>
                                                <strong>92%</strong>
                                            </div>

                                            <div className="skill-bar">
                                                <span
                                                    style={{
                                                        width: "92%"
                                                    }}
                                                ></span>
                                            </div>

                                        </div>


                                        <div className="skill">

                                            <div className="skill-info">
                                                <span>JavaScript</span>
                                                <strong>86%</strong>
                                            </div>

                                            <div className="skill-bar">
                                                <span
                                                    style={{
                                                        width: "86%"
                                                    }}
                                                ></span>
                                            </div>

                                        </div>


                                        <div className="skill">

                                            <div className="skill-info">
                                                <span>System Design</span>
                                                <strong>61%</strong>
                                            </div>

                                            <div className="skill-bar">
                                                <span
                                                    style={{
                                                        width: "61%"
                                                    }}
                                                ></span>
                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* Roadmap */}

                                <div className="roadmap-preview">

                                    <div className="roadmap-title">

                                        <span>
                                            PREPARATION ROADMAP
                                        </span>

                                        <strong>
                                            7 day plan
                                        </strong>

                                    </div>


                                    <div className="roadmap-days">

                                        <div className="roadmap-day roadmap-day--active">
                                            <span>01</span>
                                            <small>React</small>
                                        </div>

                                        <div className="roadmap-day">
                                            <span>02</span>
                                            <small>JS</small>
                                        </div>

                                        <div className="roadmap-day">
                                            <span>03</span>
                                            <small>APIs</small>
                                        </div>

                                        <div className="roadmap-day">
                                            <span>04</span>
                                            <small>DSA</small>
                                        </div>

                                        <div className="roadmap-day">
                                            <span>05</span>
                                            <small>Design</small>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Floating AI card */}

                    <div className="floating-card floating-card--score">

                        <div className="floating-icon">
                            ✦
                        </div>

                        <div>

                            <span>
                                AI ANALYSIS
                            </span>

                            <strong>
                                Profile analyzed
                            </strong>

                        </div>

                        <span className="floating-check">
                            ✓
                        </span>

                    </div>


                    <div className="floating-card floating-card--gap">

                        <div className="gap-icon">
                            !
                        </div>

                        <div>

                            <span>
                                SKILL GAP
                            </span>

                            <strong>
                                System Design
                            </strong>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                STATS
            ================================================= */}

            <section className="stats-section">

                <div className="stat">

                    <strong>
                        AI
                    </strong>

                    <span>
                        Personalized analysis
                    </span>

                </div>


                <div className="stat-divider"></div>


                <div className="stat">

                    <strong>
                        24+
                    </strong>

                    <span>
                        Targeted questions
                    </span>

                </div>


                <div className="stat-divider"></div>


                <div className="stat">

                    <strong>
                        7-Day
                    </strong>

                    <span>
                        Preparation roadmap
                    </span>

                </div>


                <div className="stat-divider"></div>


                <div className="stat">

                    <strong>
                        1
                    </strong>

                    <span>
                        Personalized strategy
                    </span>

                </div>

            </section>


            {/* =================================================
                FEATURES
            ================================================= */}

            <section
                className="features-section"
                id="features"
            >

                <div className="section-heading">

                    <span>
                        EVERYTHING IN ONE PLACE
                    </span>

                    <h2>
                        Stop guessing what
                        <br />
                        to prepare.
                    </h2>

                    <p>
                        AI Interview Prep analyzes the role you're targeting
                        and turns your profile into a focused preparation plan.
                    </p>

                </div>


                <div className="features-grid">

                    <article className="feature-card feature-card--large">

                        <div className="feature-card__number">
                            01
                        </div>

                        <div className="feature-icon">
                            ✦
                        </div>

                        <h3>
                            AI-Powered Interview Strategy
                        </h3>

                        <p>
                            Get a preparation strategy generated specifically
                            for the job you're targeting instead of following
                            a generic interview checklist.
                        </p>

                        <div className="feature-visual strategy-visual">

                            <div className="visual-line"></div>
                            <div className="visual-line visual-line--short"></div>
                            <div className="visual-line"></div>

                            <div className="visual-badge">
                                AI Generated
                            </div>

                        </div>

                    </article>


                    <article className="feature-card">

                        <div className="feature-card__number">
                            02
                        </div>

                        <div className="feature-icon">
                            ◫
                        </div>

                        <h3>
                            Resume Analysis
                        </h3>

                        <p>
                            Upload your resume and let AI understand your
                            projects, skills and experience.
                        </p>

                        <div className="resume-mini">

                            <div className="resume-mini__top">
                                <span></span>
                                <span></span>
                            </div>

                            <div></div>
                            <div></div>
                            <div className="short"></div>

                        </div>

                    </article>


                    <article className="feature-card">

                        <div className="feature-card__number">
                            03
                        </div>

                        <div className="feature-icon">
                            ?
                        </div>

                        <h3>
                            Job-Specific Questions
                        </h3>

                        <p>
                            Practice technical and behavioral questions
                            relevant to the position you're applying for.
                        </p>

                        <div className="question-mini">

                            <span>01</span>

                            <div>
                                <strong>
                                    Explain React hooks...
                                </strong>

                                <small>
                                    Technical question
                                </small>
                            </div>

                        </div>

                    </article>


                    <article className="feature-card feature-card--wide">

                        <div className="feature-card__number">
                            04
                        </div>

                        <div className="feature-icon">
                            ↗
                        </div>

                        <h3>
                            Skill Gaps & Preparation Roadmap
                        </h3>

                        <p>
                            Understand where you stand and what you should
                            focus on before the interview.
                        </p>

                        <div className="gap-mini">

                            <div>
                                <span>React</span>
                                <strong>92%</strong>
                            </div>

                            <div>
                                <span>JavaScript</span>
                                <strong>86%</strong>
                            </div>

                            <div className="gap-mini--warning">
                                <span>System Design</span>
                                <strong>61%</strong>
                            </div>

                        </div>

                    </article>

                </div>

            </section>


            {/* =================================================
                HOW IT WORKS
            ================================================= */}

            <section
                className="how-section"
                id="how-it-works"
            >

                <div className="section-heading">

                    <span>
                        HOW IT WORKS
                    </span>

                    <h2>
                        From job description
                        <br />
                        to interview-ready.
                    </h2>

                </div>


                <div className="workflow">

                    <div className="workflow-line"></div>


                    <article className="workflow-step">

                        <div className="workflow-number">
                            01
                        </div>

                        <span className="workflow-icon">
                            💼
                        </span>

                        <h3>
                            Add the job
                        </h3>

                        <p>
                            Paste the job description for the position
                            you're targeting.
                        </p>

                    </article>


                    <article className="workflow-step">

                        <div className="workflow-number">
                            02
                        </div>

                        <span className="workflow-icon">
                            📄
                        </span>

                        <h3>
                            Add your profile
                        </h3>

                        <p>
                            Upload your resume or describe your skills,
                            experience and projects.
                        </p>

                    </article>


                    <article className="workflow-step">

                        <div className="workflow-number">
                            03
                        </div>

                        <span className="workflow-icon">
                            ✦
                        </span>

                        <h3>
                            Let AI analyze
                        </h3>

                        <p>
                            Your role and profile are analyzed to build
                            a focused interview strategy.
                        </p>

                    </article>


                    <article className="workflow-step">

                        <div className="workflow-number">
                            04
                        </div>

                        <span className="workflow-icon">
                            🎯
                        </span>

                        <h3>
                            Start preparing
                        </h3>

                        <p>
                            Follow your questions, skill gaps and
                            personalized preparation roadmap.
                        </p>

                    </article>

                </div>

            </section>


            {/* =================================================
                REPORT SECTION
            ================================================= */}

            <section className="report-section">

                <div className="report-copy">

                    <span>
                        KNOW WHERE YOU STAND
                    </span>

                    <h2>
                        A preparation plan
                        <br />
                        built around you.
                    </h2>

                    <p>
                        Don't spend hours preparing everything.
                        Focus on the skills and questions that matter
                        for your target role.
                    </p>


                    <div className="report-points">

                        <div>
                            <span>✓</span>
                            Match score
                        </div>

                        <div>
                            <span>✓</span>
                            Technical questions
                        </div>

                        <div>
                            <span>✓</span>
                            Behavioral questions
                        </div>

                        <div>
                            <span>✓</span>
                            Skill gaps
                        </div>

                    </div>


                    <button
                        onClick={() => navigate("/register")}
                        className="report-button"
                    >
                        Build My Strategy
                        <span>→</span>
                    </button>

                </div>


                {/* Report visual */}

                <div className="report-visual">

                    <div className="report-window">

                        <div className="report-window__header">

                            <div>
                                <span>
                                    INTERVIEW REPORT
                                </span>

                                <strong>
                                    Frontend Developer
                                </strong>
                            </div>

                            <span className="report-window__badge">
                                AI Analysis
                            </span>

                        </div>


                        <div className="report-score-large">

                            <div className="score-ring">

                                <div>
                                    <strong>
                                        84
                                    </strong>

                                    <span>
                                        /100
                                    </span>
                                </div>

                            </div>


                            <div>

                                <span>
                                    MATCH SCORE
                                </span>

                                <strong>
                                    Strong match
                                </strong>

                                <p>
                                    Your profile aligns well with
                                    the target role.
                                </p>

                            </div>

                        </div>


                        <div className="report-skill-grid">

                            <div>
                                <span>React.js</span>
                                <strong>92%</strong>
                            </div>

                            <div>
                                <span>JavaScript</span>
                                <strong>86%</strong>
                            </div>

                            <div>
                                <span>REST APIs</span>
                                <strong>81%</strong>
                            </div>

                            <div className="skill-warning">
                                <span>System Design</span>
                                <strong>61%</strong>
                            </div>

                        </div>


                        <div className="report-roadmap">

                            <span>
                                NEXT FOCUS
                            </span>

                            <strong>
                                Strengthen System Design
                            </strong>

                            <div className="roadmap-progress">

                                <span></span>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                FINAL CTA
            ================================================= */}

            <section className="cta-section">

                <div className="cta-glow"></div>


                <div className="cta-content">

                    <span>
                        ✦ READY WHEN YOU ARE
                    </span>

                    <h2>
                        Walk into your next
                        <br />
                        interview prepared.
                    </h2>

                    <p>
                        Give AI the job description.
                        We'll help you figure out what to prepare.
                    </p>


                    <button
                        onClick={() => navigate("/register")}
                    >
                        Get Started Free
                        <span>→</span>
                    </button>

                </div>

            </section>


            {/* =================================================
                FOOTER
            ================================================= */}

            <footer className="landing-footer">

                <div className="footer-brand">

                    <span>
                        ✦
                    </span>

                    <strong>
                        AI Interview Prep
                    </strong>

                </div>


                <p>
                    AI-powered preparation for your next interview.
                </p>


                <div className="footer-links">

                    <a href="#features">
                        Features
                    </a>

                    <a href="#how-it-works">
                        How it works
                    </a>

                    <a href="#privacy">
                        Privacy
                    </a>

                    <a href="#terms">
                        Terms
                    </a>

                </div>


                <div className="footer-bottom">

                    © 2026 AI Interview Prep

                </div>

            </footer>

        </main>
    );
};

export default Landing;