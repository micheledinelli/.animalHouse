import React from "react";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";

import '../scss/style.scss';
import "../css/navbar.css";

const Navbar = () => {
    
    return(
        <nav className="navbar sticky-top navbar-expand-lg bg-white navbar-light">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggledDiv" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span>
                        <i className="bi bi-three-dots"></i>
                    </span>
                </button>
                <a className="navbar-brand text-secondary" href="#">animalHouse.</a>
                <div className="collapse navbar-collapse" id="toggledDiv">
                    <ul className="navbar-nav d-flex ms-auto">
                        <li className="nav-item mx-3">
                            <a className="btn nav-btn btn-outline-dark fs-5" aria-current="page" href="/gamePage">Our games</a>
                        </li>
                        <li className="nav-item mx-3">
                            <a className="btn nav-btn btn-outline-dark fs-5" aria-current="page" href="/signIn">Front Office</a>
                        </li>
                        <li className="nav-item mx-3">
                            <a className="btn nav-btn btn-outline-dark fs-5" aria-current="page" href="/backOffice">Back Office</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;