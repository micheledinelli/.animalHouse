import React from "react";

const NavbarFrontOffice = () => {

    return(
        <div className="row">
            <div className="col-lg-2 col-side-bar-single-user">
                <nav className="bg-primary navbar-expand-lg side-bar-single-user">
                    <div className="container">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggledDiv" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                            <span>
                                <i className="bi bi-three-dots text-white"></i>
                            </span>
                        </button>

                        <div className="collapse navbar-collapse" id="toggledDiv">
                            <ul className="navbar-nav d-flex flex-column">
                                <li className="nav-item mx-3 my-3">
                                    <a className="btn btn-outline-light fs-5 nav-btn" href="./">
                                        <i className="bi bi-arrow-left-circle"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default NavbarFrontOffice;