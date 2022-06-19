import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Auth from '../Auth';

/**
 * @returns first child route if user is authenticated or redirect to sign in
 */
const ProtectedRouteByRole = () => {

    const location = useLocation();
    
    const auth = Auth.getInstance();

    const authenticator = window.localStorage.getItem("authenticator");

    let isAuth = ( authenticator == 0 && auth.isAuthenticated && auth.role == 999) ? 
                    true : 
                    false;

    return isAuth ? 
                <Outlet /> : 
                <Navigate to="/" replace state={{ error: "Your role is not admin" }} /> 

}

export default ProtectedRouteByRole;