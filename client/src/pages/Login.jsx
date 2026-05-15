import React, { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import "../ui/LoginStyle.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            if (response.success) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/");
            } else {
                setError(response.message || "Invalid credentials");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred while trying to log in.");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="left-panel">
                <div className="logo">
                    <div className="logo-icon">
                        <LogIn size={20} />
                    </div>
                    <span className="logo-text">SmartInvoice</span>
                </div>

                <div className="form-header">
                    <h1>Welcome back</h1>
                    <p>Enter your credentials to access your account and manage your invoices.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={18} />
                            <input
                                type="email"
                                id="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={18} />
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="forgot-password">
                        <a href="/forgot-password">Forgot password?</a>
                    </div>

                    <button type="submit" className="btn-signin">
                        Sign in
                    </button>

                    {error && <p style={{ color: "#ff4d4d", fontSize: "13px", marginTop: "12px", textAlign: "center" }}>{error}</p>}

                    <div className="signup-link">
                        Don't have an account? <a href="/register">Create one for free</a>
                    </div>
                </form>
            </div>

            <div className="right-panel">
                <div className="right-tagline">
                    Simplify your <span className="highlight">billing process</span> and get paid faster.
                </div>
            </div>
        </div>
    );
};

export default Login;
