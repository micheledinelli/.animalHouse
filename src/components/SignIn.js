import React, { useState } from "react";
import axios from  "axios";

// Auth manager
import Auth from '../Auth';

import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";

import loginImage from '../assets/undraw_Login_re_4vu2.png';

import { useLocation, useNavigate } from "react-router-dom";

const SignIn = () => {
    
    const location = useLocation();
    const targetPath = location.state?.from || '/';
    const navigate = useNavigate();

    let auth = Auth.getInstance();

    const [data, setData] = React.useState({
        email: "",
        password: ""
    });

    const [serverMessage, setServerMessage] = React.useState();

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = "http://localhost:8080/api/auth";
            const {data: res} = await axios.post(url, data);
            
            setServerMessage(res.message);

            // Pass the email and the role to the login method
            // The role comes from the server
            auth.login(data.email, res.role);

            navigate(targetPath, {replace: true});
            
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                setServerMessage(error.response.data.message);
            }
        }
    }

    const [emailToRecover, setEmailToRecover] = useState({etr: ""});

    const handleRecoverEmail = ({currentTarget: input}) => {
        setEmailToRecover({...emailToRecover, [input.name]: input.value});
    }

    const recoverPassword = async (e) => {
        e.preventDefault();

        try {
            const url = "http://localhost:8080/api/recoverpw";
            const res = await axios.post(url, emailToRecover);
            setServerMessage(res.data.message);

        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                setServerMessage(error.response.data.message);
            }
        }
    }

    return(
        <div className="container mt-2 text-center">
            <h1 className="display-4">Sign In!</h1>
            <div className="row container">
                <div className="col-lg-6">
                    <img src={loginImage} className="img-fluid" alt="loginImage"></img>
                </div>
                <div className="col-lg-6 align-self-center p-5">
                    <form className="text-center" onSubmit={handleSubmit}>
                        { serverMessage &&
                            <p className="text-primary">
                                { serverMessage }
                            </p>
                        }
                        <div className="form-floating mb-3">
                            <input 
                                type="email" 
                                className="form-control"
                                name="email" 
                                placeholder="name@example.com" 
                                required
                                onChange={handleChange}
                            />
                            <label htmlFor="email">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input 
                                type="password" 
                                className="form-control" 
                                name="password" 
                                placeholder="Password"
                                required
                                onChange={handleChange} 
                            />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button type="submit" className="btn btn-lg btn-outline-secondary mt-3">Submit</button>                            
                    </form>
                    <div className="container text-center mt-3">
                        <p className="text-center">or</p>
                        <a 
                            className="btn btn-lg btn-outline-primary mx-2" 
                            href="/signUp">
                                Sign Up
                        </a>
                        <a 
                            className="mx-2 text-black" 
                            data-bs-toggle="modal" 
                            data-bs-target="#recover-password-modal"
                            href="#">
                                Recover password
                        </a>
                    </div>
                </div>
            </div>
            
            {/* Recover password modal */}
            <div className="modal fade" id="recover-password-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Recover Password</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={recoverPassword} className="text-center">
                                <div className="form-floating mb-3">
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        name="etr" 
                                        placeholder="email"
                                        onChange={handleRecoverEmail}
                                        required 
                                    />
                                    <label htmlFor="etr">your email</label>
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-outline-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Send email
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SignIn;