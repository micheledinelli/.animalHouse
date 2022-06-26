import React from "react";
import { Link } from "react-router-dom";

// Auth manager
import Auth from '../../Auth';

import "../../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js";

import '../../scss/style.scss';
import "../../css/navbar.css";

const GameNavbar = () =>{

    return(
        <nav className="navbar sticky-top navbar-expand-lg bg-white navbar-light">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggledDiv" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span>
                        <i className="bi bi-three-dots"></i>
                    </span>
                </button>
                <a 
                    className="navbar-brand text-secondary" 
                    href="/">
                    animalHouse.
                </a>
                <div className="collapse navbar-collapse" id="toggledDiv">
                    <ul className="navbar-nav">
                        <li class="nav-item mx-4">
                            <a 
                                className="nav-link active fs-4" 
                                aria-current="page" 
                                href="./gamePage#News">
                                Notizie
                            </a>
                        </li>
                        <li class="nav-item mx-4">
                            <a 
                                className="nav-link active fs-4" 
                                aria-current="page" 
                                href="./gamePage#Games">
                                Giochi
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav d-flex ms-auto">
                        <li className="nav-item mx-3">
                            <a 
                                className="btn nav-btn btn-warning fs-5" 
                                aria-current="page" 
                                href="/frontOffice">
                                Front Office
                            </a>
                        </li>
                        {   
                            window.localStorage.getItem("authenticator") &&
                            <li className="nav-item mx-3">
                                <Link to="/user">
                                    <button className="btn btn-outline-primary fs-5 user-btn-nav"> { Auth.getInstance().userEmail }</button>
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default GameNavbar;
