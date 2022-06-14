import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./components/Landing.js";
import GamePage from "./components/GamePage.js";

function App() {
    // return (
    //     <div className="App">
    //         <Landing />
    //     </div>
    // );

    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/gamePage" element={<GamePage />}></Route>
          </Routes>
        </BrowserRouter>
    );
}

export default App;