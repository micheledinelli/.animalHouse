import React from "react";
import { Link } from "react-router-dom";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";

import registerImage from '../assets/undraw_welcome_cats_thqn.png';

const SignUp = () => {

    return(
        <div className="container mt-2 text-center">
            <h1 className="display-4">Sign Up!</h1>
            <div className="row container">
                <div className="col-sm-6">
                    <img src={registerImage} className="img-fluid" alt="loginImage"></img>
                </div>
                <div className="col-sm-6 align-self-center p-5">
                    <form className="text-center">
                        <div className="d-flex justify-content-around">
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Name</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                <label htmlFor="floatingPassword">Surname</label>
                            </div>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button type="submit" className="btn btn-outline-secondary mt-3">Submit</button>                            
                    </form>
                    <div className="container text-center mt-3">
                        <p className="text-center">or</p>
                        <Link to={'/signIn'}>
                            <a className="btn btn-outline-primary mx-2">Sign In</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SignUp;