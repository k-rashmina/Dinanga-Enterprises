import React from "react";
import { Route, Navigate } from "react-router-dom";
import { getAuthToken } from "./authService";

// Higher-order component for protected routes
const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!getAuthToken(); // Check if the user is authenticated

  return (
    <Route
      {...rest}
      element={isAuthenticated ? (
        <Element />
      ) : (
        <Navigate to="/emplogin" replace />
      )}
    />
  );
};

export default ProtectedRoute;

