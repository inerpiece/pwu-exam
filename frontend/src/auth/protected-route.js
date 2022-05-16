// src/auth/protected-route.js

import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import Loading  from '../components/loading';

import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = ({ component, ...args }) => (
//   <Route
//     element={withAuthenticationRequired(component, {
//       onRedirecting: () => <Loading />,
//     })}
//     {...args}
//   />
// );

const ProtectedRoute = () => {
    const {isAuthenticated} = useAuth0(); // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;