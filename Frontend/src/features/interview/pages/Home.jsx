import React, { useState, useRef, useEffect } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview.js";
import { useAuth } from "../../auth/hooks/useAuth.js";
import { useNavigate } from "react-router";

const Home = () => {

    const { loading, generateReport, reports } = useInterview();
    const { user, handleLogout } = useAuth();

    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [resumeName, setResumeName] = useState("");
    const [profileOpen, setProfileOpen] = useState(false);

    const resumeInputRef = useRef();
    const profileRef = useRef();

    const navigate = useNavigate();

    /* Close profile dropdown when clicking outside */
    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }

        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

    const handleGenerateReport = async () => {

        const resumeFile = resumeInputRef.current.files[0];

        const data = await generateReport({
            jobDescription,
            selfDescription,
            resumeFile
        });

        navigate(`/interview/${data._id}`);
    };

    const handleResumeChange = (e) => {

        const file = e.target.files[0];

        if (file) {
            setResumeName(file.name);
        }

    };

    const handleUserLogout = async () => {

        setProfileOpen(false);

        await handleLogout();

        navigate("/login");

    };

    const getInitial = () => {

        if (user?.username) {
            return user.username.charAt(0).toUpperCase();
        }

        if (user?.email) {
            return user.email.charAt(0).toUpperCase();
        }

        return "U";
    };

    if (loading) {
        return (
            <main className="loading-screen">

                <div className="loading-content">

                    <div className="loading-spinner"></div>

                    <h1>
                        Building your interview plan...
                    </h1>

                    <p>
                        Our AI is analyzing your profile and target role.
                    </p>

                </div>

            </main>
        );
    }

    return (

        <div className="home-page">

            {/* =========================
                TOP NAVIGATION
            ========================= */}

            <nav className="dashboard-nav">

                <div
                    className="dashboard-brand"
                    onClick={() => navigate("/dashboard")}
                >

                    <div className="dashboard-brand__logo">
                        ✦
                    </div>

                    <div className="dashboard-brand__text">
                        <strong>
                            AI CareerPilot
                        </strong>

                        <span>
                            Prepare Today. Grow Tomorrow.
                        </span>
                    </div>

                </div>


                {/* PROFILE */}

                <div
                    className="profile-wrapper"
                    ref={profileRef}
                >

                    <button
                        type="button"
                        className={`profile-button ${
                            profileOpen
                                ? "profile-button--active"
                                : ""
                        }`}
                        onClick={() =>
                            setProfileOpen(!profileOpen)
                        }
                    >

                        <span className="profile-avatar">
                            {getInitial()}
                        </span>

                        <span className="profile-user">

                            <strong>
                                {user?.username || "User"}
                            </strong>

                            <small>
                                My Account
                            </small>

                        </span>

                        <span
                            className={`profile-chevron ${
                                profileOpen
                                    ? "profile-chevron--open"
                                    : ""
                            }`}
                        >
                            ↓
                        </span>

                    </button>


                    {/* PROFILE DROPDOWN */}

                    {profileOpen && (

                        <div className="profile-menu">

                            <div className="profile-menu__header">

                                <div className="profile-menu__avatar">
                                    {getInitial()}
                                </div>

                                <div>

                                    <strong>
                                        {user?.username || "User"}
                                    </strong>

                                    <span>
                                        {user?.email || ""}
                                    </span>

                                </div>

                            </div>


                            <div className="profile-menu__divider"></div>


                            <button
                                type="button"
                                className="profile-menu__item"
                                onClick={() => {
                                    setProfileOpen(false);
                                }}
                            >

                                <span className="profile-menu__icon">
                                    👤
                                </span>

                                <span>
                                    Profile
                                </span>

                            </button>


                            <button
                                type="button"
                                className="profile-menu__item"
                                onClick={() => {
                                    setProfileOpen(false);
                                }}
                            >

                                <span className="profile-menu__icon">
                                    📊
                                </span>

                                <span>
                                    My Progress
                                </span>

                            </button>


                            <button
                                type="button"
                                className="profile-menu__item"
                                onClick={() => {
                                    setProfileOpen(false);

                                    window.scrollTo({
                                        top: document.body.scrollHeight,
                                        behavior: "smooth"
                                    });
                                }}
                            >

                                <span className="profile-menu__icon">
                                    📝
                                </span>

                                <span>
                                    Interview History
                                </span>

                            </button>


                            <div className="profile-menu__divider"></div>


                            <button
                                type="button"
                                className="profile-menu__item profile-menu__item--logout"
                                onClick={handleUserLogout}
                            >

                                <span className="profile-menu__icon">
                                    ↪
                                </span>

                                <span>
                                    Logout
                                </span>

                            </button>

                        </div>

                    )}

                </div>

            </nav>


            {/* =========================
                PAGE HEADER
            ========================= */}

            <header className="page-header">

                <div className="brand-badge">
                    ✦ AI INTERVIEW PREP
                </div>

                <h1>
                    Build Your
                    <span className="highlight">
                        Interview Strategy
                    </span>
                </h1>

                <p>
                    Tell us about your target role and experience.
                    Our AI will create a personalized interview
                    preparation plan.
                </p>

            </header>


            {/* =========================
                MAIN INTERVIEW CARD
            ========================= */}

            <main className="interview-card">

                <div className="interview-card__body">

                    {/* TARGET JOB */}

                    <section className="panel panel--left">

                        <div className="panel__header">

                            <div className="panel__title-wrapper">

                                <span className="panel__icon">
                                    💼
                                </span>

                                <div>

                                    <h2>
                                        Target Job
                                    </h2>

                                    <p>
                                        What position are you preparing for?
                                    </p>

                                </div>

                            </div>

                            <span className="badge badge--required">
                                Required
                            </span>

                        </div>


                        <div className="textarea-wrapper">

                            <textarea
                                value={jobDescription}
                                onChange={(e) =>
                                    setJobDescription(e.target.value)
                                }
                                className="panel__textarea"
                                placeholder={`Paste the complete job description here...

Example:
Frontend Developer at Google

Requirements:
• React.js
• JavaScript
• TypeScript
• REST APIs
• Problem solving`}
                                maxLength={5000}
                            />

                            <span className="char-counter">
                                {jobDescription.length} / 5000
                            </span>

                        </div>


                        <div className="input-tip">

                            💡 <span>Tip:</span> Include the complete job
                            description for better AI results.

                        </div>

                    </section>


                    {/* DIVIDER */}

                    <div className="panel-divider">
                        <span>AND</span>
                    </div>


                    {/* USER PROFILE */}

                    <section className="panel panel--right">

                        <div className="panel__header">

                            <div className="panel__title-wrapper">

                                <span className="panel__icon">
                                    👤
                                </span>

                                <div>

                                    <h2>
                                        Your Profile
                                    </h2>

                                    <p>
                                        Help AI understand your experience.
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* RESUME */}

                        <div className="upload-section">

                            <label className="section-label">

                                <span>
                                    Resume
                                </span>

                                <span className="badge badge--best">
                                    Recommended
                                </span>

                            </label>


                            <label
                                className={`dropzone ${
                                    resumeName
                                        ? "dropzone--uploaded"
                                        : ""
                                }`}
                                htmlFor="resume"
                            >

                                <div className="dropzone__icon">
                                    {resumeName ? "✓" : "↑"}
                                </div>


                                {resumeName ? (

                                    <>

                                        <p className="dropzone__title">
                                            {resumeName}
                                        </p>

                                        <p className="dropzone__subtitle">
                                            Resume selected successfully
                                        </p>

                                    </>

                                ) : (

                                    <>

                                        <p className="dropzone__title">
                                            Upload your resume
                                        </p>

                                        <p className="dropzone__subtitle">
                                            Click or drag & drop
                                        </p>

                                        <span className="file-types">
                                            PDF or DOCX • Max 5MB
                                        </span>

                                    </>

                                )}


                                <input
                                    ref={resumeInputRef}
                                    hidden
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    accept=".pdf,.docx"
                                    onChange={handleResumeChange}
                                />

                            </label>

                        </div>


                        {/* OR */}

                        <div className="or-divider">
                            <span>OR</span>
                        </div>


                        {/* SELF DESCRIPTION */}

                        <div className="self-description">

                            <label
                                className="section-label"
                                htmlFor="selfDescription"
                            >
                                Quick Self-Description
                            </label>


                            <textarea
                                value={selfDescription}
                                onChange={(e) =>
                                    setSelfDescription(e.target.value)
                                }
                                id="selfDescription"
                                name="selfDescription"
                                className="panel__textarea panel__textarea--short"
                                placeholder="Tell us about your skills, experience, projects and technologies you know..."
                            />

                        </div>


                        {/* INFO BOX */}

                        <div className="info-box">

                            <span className="info-box__icon">
                                ✦
                            </span>

                            <p>
                                Upload your <strong>Resume</strong> or write
                                a <strong>Self Description</strong> to get
                                a personalized strategy.
                            </p>

                        </div>

                    </section>

                </div>


                {/* =========================
                    CARD FOOTER
                ========================= */}

                <div className="interview-card__footer">

                    <div className="footer-info">

                        <span className="status-dot"></span>

                        <div>

                            <strong>
                                AI Strategy Generator
                            </strong>

                            <small>
                                Usually takes about 30 seconds
                            </small>

                        </div>

                    </div>


                    <button
                        onClick={handleGenerateReport}
                        className="generate-btn"
                    >

                        <span>
                            ✦
                        </span>

                        <span>
                            Generate Interview Strategy
                        </span>

                        <span className="arrow">
                            →
                        </span>

                    </button>

                </div>

            </main>


            {/* =========================
                RECENT REPORTS
            ========================= */}

            {reports.length > 0 && (

                <section className="recent-reports">

                    <div className="section-heading">

                        <div>

                            <span className="eyebrow">
                                YOUR HISTORY
                            </span>

                            <h2>
                                Recent Interview Plans
                            </h2>

                        </div>

                        <span className="report-count">
                            {reports.length} Plans
                        </span>

                    </div>


                    <div className="reports-list">

                        {reports.map(report => (

                            <article
                                key={report._id}
                                className="report-item"
                                onClick={() =>
                                    navigate(`/interview/${report._id}`)
                                }
                            >

                                <div className="report-icon">
                                    ✦
                                </div>


                                <div className="report-content">

                                    <h3>
                                        {report.title ||
                                            "Untitled Position"}
                                    </h3>

                                    <p>
                                        Generated on{" "}
                                        {new Date(
                                            report.createdAt
                                        ).toLocaleDateString()}
                                    </p>

                                </div>


                                <div className="report-score">

                                    <span>
                                        Match
                                    </span>

                                    <strong
                                        className={
                                            report.matchScore >= 80
                                                ? "score--high"
                                                : report.matchScore >= 60
                                                    ? "score--mid"
                                                    : "score--low"
                                        }
                                    >
                                        {report.matchScore}%
                                    </strong>

                                </div>


                                <span className="report-arrow">
                                    →
                                </span>

                            </article>

                        ))}

                    </div>

                </section>

            )}


            {/* =========================
                PAGE FOOTER
            ========================= */}

            <footer className="page-footer">

                <span>
                    © 2026 AI CareerPilot
                </span>

                <div>

                    <a href="#privacy">
                        Privacy
                    </a>

                    <a href="#terms">
                        Terms
                    </a>

                    <a href="#help">
                        Help
                    </a>

                </div>

            </footer>

        </div>
    );
};

export default Home;