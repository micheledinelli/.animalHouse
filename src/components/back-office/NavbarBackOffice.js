import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../Auth";

const NavbarBackOffice = () => {
    return(
        <nav className="navbar sticky-top navbar-expand-lg bg-primary">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggledDiv" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span>
                        <i className="bi bi-three-dots"></i>
                    </span>
                </button>
                <a className="navbar-brand text-secondary text-white" href="#">animalHouse.</a>
                
                <div className="collapse navbar-collapse" id="toggledDiv">
                    <ul className="navbar-nav d-flex ms-auto">
                        <li className="nav-item mx-3">
                            <a 
                                className="btn nav-btn btn-outline-light fs-5" 
                                href="/findById">
                                findById
                            </a>
                        </li>
                        <li className="nav-item mx-3">
                            <a className="btn btn-outline-light fs-5 nav-btn" href="/">    
                                <i className="bi bi-house"></i>
                            </a>
                        </li>
                        {   
                            window.localStorage.getItem("authenticator") &&
                            <li className="nav-item mx-3">
                                <Link to="/user">
                                    <button className="btn btn-outline-light fs-5 user-btn-nav"> { Auth.getInstance().userEmail }</button>
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavbarBackOffice;