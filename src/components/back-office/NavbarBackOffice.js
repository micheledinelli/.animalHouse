import React from "react";

const NavbarBackOffice = () => {
    return(
        <div className="navbar bg-primary rounded-bottom">
            <div className="container text-white">
                <a className="navbar-brand text-white" href="#">Back Office</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </div>
    )
}

export default NavbarBackOffice;