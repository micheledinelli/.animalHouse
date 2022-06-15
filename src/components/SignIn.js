import React from "react";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";

import loginImage from '../assets/undraw_Login_re_4vu2.png';

const SignIn = () => {

    return(
        <div className="container mt-2 text-center">
            <h1 className="display-4">Sign In !</h1>
            <div className="row container">
                <div className="col-lg-6">
                    <img src={loginImage} className="img-fluid" alt="loginImage"></img>
                </div>
                <div className="col-lg-6 align-self-center p-5">
                    <form className="text-center">
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
                        <a className="btn btn-outline-primary mx-2" href="/signUp">Sign Up</a>
                        <a className="mx-2 text-black" href="#">Recover password</a>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SignIn;