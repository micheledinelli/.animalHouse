import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Auth from '../Auth';

const ProtectedRoute = () => {

    const location = useLocation();
    
    const auth = Auth.getInstance();

    // Get the id of auth singleton, if stored
    // user has an active session
    const authenticator = window.localStorage.getItem("authenticator");

    // If the target is back office it's mandatory to be admin (role code: 999)
    // Introducing authorization for backoffice 
    if(location.pathname == '/backOffice') { 
        const isAdmin = ( authenticator == 0 
                        && auth.isAuthenticated 
                        && auth.role == 999) ?
                        true :
                        false
        
        const isAuth = ( authenticator == 0 
                        && auth.isAuthenticated ) ?
                        true :
                        false
        
        // If an already authenticated user tries to access backoffice
        // he is redirected to the landing
        // Instead if not authenticated he gets the chance to do it
        if(isAuth) {
            return isAdmin ? 
                    <Outlet /> : 
                    <Navigate to="/" replace state={{ from: location, error: "not an admin" }} /> 
        } else {
            return <Navigate to="/signIn" replace state={{ from: location }} /> 
        }
    
    } else {
        
        // No authorization required in this if/else branch
        const isAuth = ( authenticator == 0 
                        && auth.isAuthenticated ) ?
                        true :
                        false
    
        return isAuth ? 
            <Outlet /> : 
            <Navigate to="/signIn" replace state={{ from: location }} /> 
    }
}

export default ProtectedRoute;