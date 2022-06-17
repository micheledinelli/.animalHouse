import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Auth from '../Auth';

/**
 * @returns first child route if user is authenticated or redirect to sign in
 */
const ProtectedRoute = () => {

    const location = useLocation();
    
    const auth = Auth.getInstance();

    const authenticator = window.localStorage.getItem("authenticator");

    let isAuth = authenticator == 0 && auth.isAuthenticated ? true : false;

    return isAuth ? 
                <Outlet /> : 
                <Navigate to="/signIn" replace state={{ from: location }} /> 

}

export default ProtectedRoute;