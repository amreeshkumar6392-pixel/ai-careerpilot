import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import "../auth.form.scss"

const Register = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {

        e.preventDefault()

        await handleRegister({
            username,
            email,
            password
        })

        navigate('/dashboard')
    }


    if (loading) {
        return (
            <main className="auth-loading">

                <div className="auth-spinner"></div>

                <h2>Creating your account...</h2>

                <p>
                    Setting up your interview workspace
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


                {/* =========================================
                    LEFT SIDE
                ========================================= */}

                <section className="auth-showcase">


                    {/* Brand */}

                    <div className="brand">

                        <div className="brand-logo">
                            ✦
                        </div>

                        <span>
                            AI Interview Prep
                        </span>

                    </div>


                    {/* Content */}

                    <div className="showcase-content">

                        <span className="showcase-label">
                            START YOUR INTERVIEW JOURNEY
                        </span>


                        <h1>

                            Your next
                            <span>
                                opportunity starts here.
                            </span>

                        </h1>


                        <p>

                            Create your account and let AI help you
                            prepare smarter, practice better and
                            approach every interview with confidence.

                        </p>


                        {/* Features */}

                        <div className="showcase-features">


                            <div className="feature">

                                <div className="feature-icon">
                                    ✦
                                </div>

                                <div>

                                    <strong>
                                        Personalized Strategies
                                    </strong>

                                    <p>
                                        Preparation based on your target role.
                                    </p>

                                </div>

                            </div>


                            <div className="feature">

                                <div className="feature-icon">
                                    ✓
                                </div>

                                <div>

                                    <strong>
                                        AI-Powered Preparation
                                    </strong>

                                    <p>
                                        Get relevant questions and insights.
                                    </p>

                                </div>

                            </div>


                            <div className="feature">

                                <div className="feature-icon">
                                    ↗
                                </div>

                                <div>

                                    <strong>
                                        Improve With Practice
                                    </strong>

                                    <p>
                                        Track your interview preparation.
                                    </p>

                                </div>

                            </div>


                        </div>

                    </div>


                    {/* Footer */}

                    <div className="showcase-footer">

                        <span>
                            © 2026 AI Interview Prep
                        </span>

                        <span>
                            Built for ambitious developers
                        </span>

                    </div>


                </section>



                {/* =========================================
                    RIGHT SIDE
                ========================================= */}

                <section className="auth-form-section">


                    <div className="auth-form-card">


                        {/* Mobile brand */}

                        <div className="mobile-brand">

                            <div className="brand-logo">
                                ✦
                            </div>

                            <span>
                                AI Interview Prep
                            </span>

                        </div>


                        {/* Header */}

                        <div className="auth-header">

                            <div className="auth-icon">
                                ✨
                            </div>

                            <h2>
                                Create your account
                            </h2>

                            <p>
                                Start building your personalized
                                interview preparation plan.
                            </p>

                        </div>



                        {/* Form */}

                        <form
                            className="auth-form"
                            onSubmit={handleSubmit}
                        >


                            {/* Username */}

                            <div className="input-group">

                                <label htmlFor="username">
                                    Username
                                </label>


                                <div className="input-wrapper">

                                    <span className="input-icon">
                                        @
                                    </span>


                                    <input
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Choose a username"
                                        autoComplete="username"
                                        required
                                    />

                                </div>

                            </div>



                            {/* Email */}

                            <div className="input-group">

                                <label htmlFor="register-email">
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
                                        id="register-email"
                                        name="email"
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        required
                                    />

                                </div>

                            </div>



                            {/* Password */}

                            <div className="input-group">

                                <label htmlFor="register-password">
                                    Password
                                </label>


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
                                        id="register-password"
                                        name="password"
                                        placeholder="Create a strong password"
                                        autoComplete="new-password"
                                        required
                                    />


                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword
                                            ? "Hide"
                                            : "Show"}
                                    </button>

                                </div>

                            </div>



                            {/* Security */}

                            <div className="security-note">

                                <span className="security-check">
                                    ✓
                                </span>

                                <span>
                                    Your account information is securely protected.
                                </span>

                            </div>



                            {/* Register button */}

                            <button
                                type="submit"
                                className="auth-button"
                            >

                                <span>
                                    Create account
                                </span>

                                <span className="button-arrow">
                                    →
                                </span>

                            </button>


                        </form>



                        {/* Login */}

                        <div className="auth-switch">

                            <span>
                                Already have an account?
                            </span>


                            <Link to="/login">
                                Sign in
                            </Link>

                        </div>



                        {/* Divider */}

                        <div className="auth-divider">

                            <span>
                                AI Interview Prep
                            </span>

                        </div>



                        {/* Privacy */}

                        <div className="auth-privacy">

                            <span>
                                🔒 Secure registration
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

export default Register