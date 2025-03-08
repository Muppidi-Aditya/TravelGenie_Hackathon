import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    const uid = Cookies.get('uid');

    // If the user is not authenticated, redirect to the login page
    if (!uid) {
        return <Navigate to="/login" replace />;
    }

    // If the user is authenticated, render the children (the protected component)
    return children;
};

export default ProtectedRoute;