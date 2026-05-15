import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import "../ui/LoginStyle.css";
import { useAuth } from "../contexts/authContext";

const Login = () => {
    const [email, setEmail] = useState("oussama@gmail.com");
    const [password, setPassword] = useState("password1111");
    const [error, setError] = useState("");

    const { login, loading, error: LoginError } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login({ email, password });
        } catch (error) {
            console.log(error);
            setError(error.message);
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
                    <p>
                        Enter your credentials to access your account and manage
                        your invoices.
                    </p>
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
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-signin"
                    >
                        {loading ? "Signing in..." : "Sign in"}
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
                        Don't have an account?{" "}
                        <Link to="/register">Create one for free</Link>
                    </div>
                </form>
            </div>

            <div className="right-panel">
                <div className="right-tagline">
                    Simplify your{" "}
                    <span className="highlight">billing process</span> and get
                    paid faster.
                </div>
            </div>
        </div>
    );
};

export default Login;
