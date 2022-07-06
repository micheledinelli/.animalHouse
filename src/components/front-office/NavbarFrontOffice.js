import React from "react";

const NavbarFrontOffice = () => {

    return(
        <nav className="navbar navbar-expand-lg bg-primary">
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
                            <a className="btn btn-outline-light fs-5 nav-btn" href="/">    
                                <i className="bi bi-house"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavbarFrontOffice;