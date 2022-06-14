import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

import GameImage from '../assets/undraw_game_day_ucx9.png';
import FrontOffice from '../assets/undraw_feeling_proud_qne1.png';
import BackOffice from '../assets/undraw_learning_sketching_nd4f.png';

import '../css/landing.css';

const Landing = () => {

    return(
        <div>

            <Navbar />

            <div className="landing-container container my-5">
                <div className="row mt-5">
                    <div className="col-sm-8">
                        <img className="img-fluid" src={GameImage}></img>
                    </div>
                    <div className="col-sm-4 align-self-center text-section">
                        <p className="display-4 text-muted lh-1">Discover our games!</p>
                        <p className="display-4 text-muted lh-1">Tons of new animals waiting for you!</p>
                        <button className="mt-3 btn btn-outline-dark">Explore games</button>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-sm-4 align-self-center text-section text-swap-on-bp">
                        <p className="display-4 text-muted lh-1">Get access to our products and services!</p>
                        <p className="display-4 text-muted lh-1">All through the front office.</p>
                        <button className="mt-3 btn btn-outline-dark">Front office</button>
                    </div>
                    <div className="col-sm-8">
                        <img className="img-fluid img-swap-on-bp" src={FrontOffice}></img>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-sm-8">
                        <img className="img-fluid" src={BackOffice}></img>
                    </div>
                    <div className="col-sm-4 align-self-center text-section">
                        <p className="display-4 text-muted lh-1">Manage the application thanks to the back office.</p>
                        <p className="display-4 text-muted lh-1">For admins only.</p>
                        <button className="mt-3 btn btn-outline-dark">Back office</button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Landing;