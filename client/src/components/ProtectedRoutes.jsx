import React from "react";
import { useAuth } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
    const { token, user } = useAuth();

    if (!token || !user) return <Navigate to="/login" />;

    return <>{children}</>;
};

export default ProtectedRoutes;
