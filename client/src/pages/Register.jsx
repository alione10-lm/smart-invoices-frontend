import React, { useState } from "react";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, UserPlus } from "lucide-react";
import "../ui/RegisterStyle.css";
import { useAuth } from "../contexts/authContext";
import toast from "react-hot-toast";

const Register = () => {
    const [name, setName] = useState("oussama");
    const [email, setEmail] = useState("oussama@gmail.com");
    const [password, setPassword] = useState("password1111");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { register, loading } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await register({ name, email, password });
            // navigate("/login");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "An error occurred during registration.",
            );

            toast.error(
                err.response?.data?.message ||
                    "An error occurred during registration.",
            );
        }
    };

    return (
        <div className="register-wrapper">
            <div className="left-panel">
                <div className="logo">
                    <div className="logo-icon">
                        <UserPlus size={20} />
                    </div>
                    <span className="logo-text">SmartInvoice</span>
                </div>

                <div className="form-header">
                    <h1>Create account</h1>
                    <p>Start tracking invoices in less than a minute</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <div className="input-wrapper">
                            <User className="input-icon" size={18} />
                            <input
                                type="text"
                                id="name"
                                value={name}
                                placeholder="John Doe"
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={18} />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                placeholder="name@company.com"
                                required
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                placeholder="••••••••"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-create"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </button>

                    {error && (
                        <p
                            style={{
                                color: "#ff4d4d",
                                fontSize: "13px",
                                marginTop: "12px",
                                textAlign: "center",
                            }}
                        >
                            {error}
                        </p>
                    )}

                    <div className="signup-link">
                        Already have an account?{" "}
                        <Link to="/login">Sign in</Link>
                    </div>
                </form>
            </div>

            <div className="right-panel">
                <div className="right-tagline">
                    Join thousands of businesses{" "}
                    <span className="highlight">automating their billing</span>.
                </div>
            </div>
        </div>
    );
};

export default Register;
