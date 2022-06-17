import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute.js"; 
import ErrorPage from "./components/ErrorPage.js";
import Landing from "./components/Landing.js";
import GamePage from "./components/GamePage.js";
import SignIn from "./components/SignIn.js";
import SignUp from "./components/SignUp.js";
import Test from "./components/Test.js";

function App() {

    /**
     * Switch on route, the lat one matches all the paths and returns error page
     */
    return (
        <BrowserRouter>
            <Routes>
                { /* Protected routes */}
                <Route path="/test" element={<ProtectedRoute />}>
                    <Route path="/test" element={<Test/>}></Route>
                </Route>
                
                { /* Free access */}
                <Route path="/gamePage" exact element={<GamePage />}></Route>
                <Route path="/signIn" element={<SignIn />}></Route>
                <Route path="/signUp" element={<SignUp />}></Route>
                <Route path="/" element={<Landing />}></Route>
                {/* catch unhandled routes */}
                <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;