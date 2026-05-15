import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        console.log(token);

        if (token && user) {
            setToken(token);
            setUser(JSON.parse(user));
        }
    }, []);

    const saveSession = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const clearSession = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    const login = async ({ email, password }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("/api/auth/login", {
                email,
                password,
            });

            if (response.data.success) {
                saveSession(response.data.data.user, response.data.data.token);
                navigate("/");
                toast.success("Login successful! Welcome back.");
            } else {
                toast.error(response.data.message || "Invalid credentials");
            }
        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                    "An error occurred while trying to log in.",
            );
        } finally {
            setLoading(false);
        }
    };

    const register = async ({ name, email, password }) => {
        console.log(name, email, password);

        setLoading(true);
        setError(null);
        try {
            const data = await axios.post("api/auth/register", {
                name,
                email,
                password,
            });

            console.log(data);

            // navigate("/login");

            toast.success("Registration successful! Please log in.");
        } catch (err) {
            console.log(err.response);

            toast.error(
                err.response?.data?.message ||
                    "An error occurred during registration.",
            );
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        clearSession();
        toast.success("You have been logged out.");
        navigate("/login");
    };

    const value = {
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}

export { AuthProvider, useAuth };
