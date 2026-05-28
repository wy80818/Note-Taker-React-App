import { useState } from 'react'
import '../styles/Login.css'
import { signup, login } from '../utils/auth'

function Login({ onLoginSuccess }) {
    const [isSignUp, setIsSignUp] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            let result

            if (isSignUp) {
                // Sign up mode
                if (password !== confirmPassword) {
                    setError('Passwords do not match')
                    setLoading(false)
                    return
                }

                result = await signup(username, password)
            } else {
                // Login mode
                result = await login(username, password)
            }

            if (result.success) {
                setUsername('')
                setPassword('')
                setConfirmPassword('')
                onLoginSuccess(result.user)
            } else {
                setError(result.message)
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const toggleMode = () => {
        setIsSignUp(!isSignUp)
        setError('')
        setUsername('')
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <div className="login-header">
                    <h1>Note Taker</h1>
                    <p>Your personal note-taking app</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>{isSignUp ? 'Create Account' : 'Log In'}</h2>

                    {error && (
                        <div className="login-error">
                            {error.includes('\n') ? (
                                <ul className="error-list">
                                    {error
                                        .split('\n')
                                        .filter(line => line.trim())
                                        .map((line, idx) => (
                                            <li key={idx}>{line.trim()}</li>
                                        ))}
                                </ul>
                            ) : (
                                error
                            )}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}
                            required
                            autoComplete="off"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            required
                            autoComplete="off"
                        />
                    </div>

                    {isSignUp && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>
                    )}

                    {isSignUp && (
                        <div className="password-requirements">
                            <small>Username requirements:</small>
                            <ul>
                                <li>At least 6 characters</li>
                            </ul>
                            <small>Password requirements:</small>
                            <ul>
                                <li>At least 8 characters, 1 number, 1 lowercase letter and 1 uppercase letter</li>
                            </ul>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="login-submit"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Log In'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <button
                            type="button"
                            className="toggle-mode-btn"
                            onClick={toggleMode}
                            disabled={loading}
                        >
                            {isSignUp ? 'Log In' : 'Sign Up'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
