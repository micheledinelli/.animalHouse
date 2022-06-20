// React
import React from "react";
import { Link } from 'react-router-dom';

// Components
import Navbar from "./Navbar";
import Footer from "./Footer"

// Assets
import GameImage from '../assets/undraw_game_day_ucx9.png';
import FrontOffice from '../assets/undraw_feeling_proud_qne1.png';
import BackOffice from '../assets/undraw_learning_sketching_nd4f.png';

// Scss and css
import '../scss/style.scss';
import '../css/landing.css';

// UI animation
import { Fade } from "react-awesome-reveal";

const Landing = () => {

    return(
        <div>

            <Navbar />
            <div className="landing-container container my-5">
                <Fade delay={400}>
                <div className="row mt-5">
                    <div className="col-sm-8">
                        <img className="img-fluid" src={GameImage} alt="gameImage"></img>
                    </div>
                    <div className="col-sm-4 align-self-center text-section">
                        <p className="display-4 text-secondary lh-1">Discover our games!</p>
                        <p className="display-4 text-secondary lh-1">Ton of new animals waiting for you!</p>
                        <Link to={'/gamePage'}>
                            <button className="mt-3 btn btn-lg btn-primary text-white">Explore games</button>
                        </Link>
                    </div>
                </div>
                <div className="row mt-5" id="to-reverse-mobile">
                    <div className="col-sm-4 align-self-center text-section text-swap-on-bp">
                        <p className="display-4 text-secondary lh-1">Get access to our products and services!</p>
                        <p className="display-4 text-secondary lh-1">All through the front office.</p>
                        <Link to={'/frontOffice'}>
                            <button className="mt-3 btn btn-lg btn-primary text-white">Front Office</button>
                        </Link>
                    </div>
                    <div className="col-sm-8">
                        <img className="img-fluid img-swap-on-bp" src={FrontOffice} alt="frontOffice"></img>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-sm-8">
                        <img className="img-fluid" src={BackOffice} alt="backOffice"></img>
                    </div>
                    <div className="col-sm-4 align-self-center text-section">
                        <p className="display-4 text-secondary lh-1">Manage the application thanks to the back office.</p>
                        <p className="display-4 text-secondary lh-1">For admins only.</p>
                        <Link to={'/backOffice'}>
                            <button className="mt-3 btn btn-lg btn-primary text-white">Back office</button>
                        </Link>
                    </div>
                </div>
                </Fade>
            </div>

            <Footer />
        </div>
    )
}

export default Landing;