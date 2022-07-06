import React from "react";

import { Link } from 'react-router-dom';

import { Slide, Fade } from "react-awesome-reveal";

import '../../css/back-office.css';

import People from "../../assets/undraw_People_re_8spw.png";
import Manage from "../../assets/undraw_Social_update_re_xhjr.png";

const BackOffice = () => {
    return(
        <div className="container"> 
            <h1 className="display-3 text-center">Welcome to <b>BackOffice</b></h1>
            <div className="row mt-5 mx-3">
                <div className="col-lg-6">
                    <Link to="/backOffice/personalData">
                        <img src={People} className="img-fluid zoom"></img>
                    </Link>
                    <Slide direction="left" delay={600}>
                        <p className="display-5 text-center">Personal data</p>
                    </Slide>
                </div>
                <div className="col-lg-6">
                    <Link to="/backOffice/wallManager">
                        <img src={Manage} className="img-fluid zoom"></img>
                    </Link>
                    <Slide direction="right" delay={600}>
                        <p className="display-5 text-center">Wall manager</p>
                    </Slide>
                </div>
            </div>
            <div className="container text-center w-50 d-grid gap-2">
                <Link to="/">
                    <button className="btn btn-outline-primary btn-lg" type="button">Go back</button>
                </Link>
            </div>
        </div>
    )
}

export default BackOffice;