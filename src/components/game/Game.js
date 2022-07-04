// React
import React from "react";

// Components
import GameNavbar from "./GameNavbar";
import AnimalNews from "./AnimalNews";
import AnimalGames from "./AnimalGames";
import Footer from "../Footer.js" 


const GamePage = () => {
    return(
        <div>
            <GameNavbar />
            <AnimalGames />
            <AnimalNews />
            <Footer />
        </div>
    )
}

export default GamePage;