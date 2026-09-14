import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        await handleLogin({
            email,
            password
        })

       navigate('/dashboard')
    }

    if (loading) {
        return (
            <main className="auth-loading">

                <div className="auth-spinner"></div>

                <h2>Signing you in...</h2>

                <p>
                    Preparing your interview workspace
                </p>

            </main>
        )
    }

    return (
        <main className="auth-page">

            {/* Background decoration */}
            <div className="auth-background">
                <div className="auth-orb auth-orb--one"></div>
                <div className="auth-orb auth-orb--two"></div>
            </div>


            <div className="auth-container">

                {/* =========================
                    LEFT SIDE
                ========================= */}

                <section className="auth-showcase">

                    <div className="brand">

                        <div className="brand-logo">
                            ✦
                        </div>

                        <span>
                            AI Interview Prep
                        </span>

                    </div>


                    <div className="showcase-content">

                        <span className="showcase-label">
                            AI-POWERED INTERVIEW PREPARATION
                        </span>

                        <h1>
                            Prepare smarter.
                            <span> Interview better.</span>
                        </h1>

                        <p>
                            Build personalized interview strategies,
                            practice with AI-generated questions and
                            improve your chances of landing your dream job.
                        </p>


                        <div className="showcase-features">

                            <div className="feature">

                                <div className="feature-icon">
                                    ✦
                                </div>

                                <div>
                                    <strong>
                                        Personalized Preparation
                                    </strong>

                                    <p>
                                        AI analyzes your role and profile.
                                    </p>
                                </div>

                            </div>


                            <div className="feature">

                                <div className="feature-icon">
                                    ✓
                                </div>

                                <div>
                                    <strong>
                                        AI-Powered Insights
                                    </strong>

                                    <p>
                                        Get targeted recommendations.
                                    </p>
                                </div>

                            </div>


                            <div className="feature">

                                <div className="feature-icon">
                                    ↗
                                </div>

                                <div>
                                    <strong>
                                        Track Your Progress
                                    </strong>

                                    <p>
                                        Improve with every interview.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="showcase-footer">

                        <span>
                            © 2026 AI Interview Prep
                        </span>

                        <span>
                            Built for ambitious developers
                        </span>

                    </div>

                </section>


                {/* =========================
                    RIGHT SIDE
                ========================= */}

                <section className="auth-form-section">

                    <div className="auth-form-card">

                        <div className="mobile-brand">

                            <div className="brand-logo">
                                ✦
                            </div>

                            <span>
                                AI Interview Prep
                            </span>

                        </div>


                        <div className="auth-header">

                            <div className="auth-icon">
                                👋
                            </div>

                            <h2>
                                Welcome back
                            </h2>

                            <p>
                                Sign in to continue your interview preparation.
                            </p>

                        </div>


                        <form
                            className="auth-form"
                            onSubmit={handleSubmit}
                        >

                            {/* Email */}

                            <div className="input-group">

                                <label htmlFor="email">
                                    Email address
                                </label>

                                <div className="input-wrapper">

                                    <span className="input-icon">
                                        @
                                    </span>

                                    <input
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        required
                                    />

                                </div>

                            </div>


                            {/* Password */}

                            <div className="input-group">

                                <div className="password-label">

                                    <label htmlFor="password">
                                        Password
                                    </label>

                                </div>


                                <div className="input-wrapper">

                                    <span className="input-icon">
                                        •
                                    </span>

                                    <input
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        required
                                    />


                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>

                                </div>

                            </div>


                            {/* Remember / Security */}

                            <div className="security-note">

                                <span className="security-check">
                                    ✓
                                </span>

                                <span>
                                    Your connection is securely encrypted
                                </span>

                            </div>


                            {/* Submit */}

                            <button
                                type="submit"
                                className="auth-button"
                            >

                                <span>
                                    Sign in
                                </span>

                                <span className="button-arrow">
                                    →
                                </span>

                            </button>

                        </form>


                        {/* Register */}

                        <div className="auth-switch">

                            <span>
                                Don't have an account?
                            </span>

                            <Link to="/register">
                                Create an account
                            </Link>

                        </div>


                        <div className="auth-divider">
                            <span>
                                AI Interview Prep
                            </span>
                        </div>


                        <div className="auth-privacy">

                            <span>
                                🔒 Secure login
                            </span>

                            <span>
                                •
                            </span>

                            <span>
                                Private & protected
                            </span>

                        </div>

                    </div>

                </section>

            </div>

        </main>
    )
}

export default Login