import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute.js"; 
import ErrorPage from "./components/ErrorPage.js";
import Landing from "./components/Landing.js";
import SignIn from "./components/SignIn.js";
import SignUp from "./components/SignUp.js";
import User from "./components/User.js";

import Game from "./components/game/Game.js";
import BackOffice from "./components/back-office/BackOffice.js";
import FrontOffice from "./components/front-office/FrontOffice";
import PersonalData from "./components/back-office/PersonalData.js";
import SingleUserData from "./components/back-office/SingleUserData.js";

import Youtube from "./components/game/youtubeVideos.js";
import MemoryGame from "./components/game/memoryGame.js";
import Hangman from "./components/game/Hangman.js";

function App() {

    /**
     * Switch on route, the lat one matches all the paths and returns error page
     */
    return (
        <BrowserRouter>
            <Routes>
                { /* Protected route: authentication required */}
                <Route path="/frontOffice" element={<ProtectedRoute />}>
                    <Route path="/frontOffice" element={<FrontOffice />}></Route>
                </Route>

                { /* Protected route: authentication + authorization */}
                <Route path="/backOffice" element={<ProtectedRoute />}>
                    <Route path="/backOffice">
                        <Route index={true} element={<BackOffice />}></Route>
                        <Route path="personalData" element={<PersonalData />}></Route>
                        <Route path="personalData/:id" element={<SingleUserData />}></Route>
                    </Route>
                </Route>

                { /* Free access */}
                <Route path="/gamePage">
                    <Route index={true} element={<Game />}></Route>
                    <Route path="hangman" element={<Hangman />}></Route>
                </Route>
                <Route path="/signIn" element={<SignIn />}></Route>
                <Route path="/signUp" element={<SignUp />}></Route>
                <Route path="/user" element={<User />}></Route>
                <Route path="/youtubeVideos" element={<Youtube />}></Route>
                <Route path="/memory" element={<MemoryGame />}></Route>
                <Route path="/" exact element={<Landing />}></Route>
                
                {/* catch unhandled routes */}
                <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;