// src/auth/protected-route.js

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const {isAuthenticated} = useAuth0(); // check if the variable isAuthenticated from auth0 returns true or false (based on logged in user)

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;