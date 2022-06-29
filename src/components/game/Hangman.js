import React from "react";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";

import Hangman0 from "../../assets/hangman-states/0.png";
import Hangman1 from "../../assets/hangman-states/1.png";
import Hangman2 from "../../assets/hangman-states/2.png";
import Hangman3 from "../../assets/hangman-states/3.png";
import Hangman4 from "../../assets/hangman-states/4.png";
import Hangman5 from "../../assets/hangman-states/5.png";
import Hangman6 from "../../assets/hangman-states/6.png";

const Hangman = () => {


    useEffect(() => {

    }, []);

    return(
        <div className="container-fluid text-center">
            <Fade delay={400}>
                <p className="display-4">Welcome to hangman!</p>
            </Fade>
            <div className="row container">
                <div className="col-lg-6 bg-secondary p-5 rounded-circle mt-3">
                    <img src={Hangman6} className="img-fluid hangman-img"></img>
                </div>
                <div className="col-lg-6 d-flex align-items-center mt-5">
                    <form>
                        <div className="d-flex flex-row mb-3">
                            <div className="p-2">
                                <input className="form-control form-control-lg" type="text" pattern="[AZaz]{1}"/>
                                <p className="fw-bold display-6">+</p>
                            </div>
                            <div className="p-2">
                                <input className="form-control form-control-lg" type="text"/>
                                <p className="fw-bold display-6">+</p>
                            </div>
                            <div className="p-2">
                                <input className="form-control form-control-lg" type="text"/>
                                <p className="fw-bold display-6">+</p>
                            </div>
                            <div className="p-2">
                                <input className="form-control form-control-lg" pattern="[A-Za-z]{1}" type="text"/>
                                <p className="fw-bold display-6">+</p>
                            </div>
                        </div>  
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Hangman;