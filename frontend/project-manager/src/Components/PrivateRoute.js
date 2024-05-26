import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './PrivateRoute.css';

const PrivateRoute = ({ element: Component, isAuthenticated }) => {
    const [showError, setShowError] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
                setRedirect(true);
            }, 3000); // Show error for 3 seconds

            return () => clearTimeout(timer); // Clean up the timer on component unmount
        }
    }, [isAuthenticated]);

    if (isAuthenticated) {
        return Component;
    }

    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            {showError && <div className="error-popup">You must be logged in to access this page.</div>}
        </>
    );
};

export default PrivateRoute;
