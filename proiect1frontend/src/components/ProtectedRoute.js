import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userType = localStorage.getItem('userType');

    if (!userType || !allowedRoles.includes(userType)) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
