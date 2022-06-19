import React, { useState } from "react";
import axios from "axios";

// Auth Manager
import Auth from '../Auth';

import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";

// Assets
import UserImage from '../assets/undraw_Personal_info_re_ur1n.png';

import { useNavigate } from "react-router-dom";

// Possible interaction:

// : delete account
// : change password
// : logout
// : ...others ?

const User  = () => {

    const navigate = useNavigate();
    const auth = Auth.getInstance();

    const [data, setData] = useState({
        email: auth.userEmail,
        password: "",
        newPassword: ""
    });

    const [serverMessage, setServerMessage] = useState(); 

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = "http://localhost:8080/api/changepw";
            const {data: res} = await axios.post(url, data);
            setServerMessage(res.message);

        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                setServerMessage(error.response.data.message);
            }
        }
    }

    const logout = () => {
        auth.logout();
        navigate("/", { replace: true });    
    }

    return(
        <div className="container-fluid">  
            <div className="title text-center">
                {
                    window.localStorage.getItem("authenticator") &&
                        <h1 className="display-5 mt-3">
                            { auth.userEmail }
                        </h1>
                }
            </div>

            <div className="row">
                <div className="col-lg-6 text-center">
                    <img className="img-fluid" src={UserImage}></img>
                    <a className="btn btn-lg btn-outline-primary mb-3" href="/">Go back</a>
                </div>
                <div className="col-lg-6 d-flex flex-column justify-content-center">
                    {
                        serverMessage && 
                            <p className="text-primary text-center">
                                { serverMessage }
                            </p>
                    }
                    <button onClick={logout} className="btn btn-lg btn-outline-secondary my-3 text-danger">Logout</button>
                    <button 
                        className="btn btn-lg btn-outline-secondary my-3"
                        data-bs-toggle="modal" 
                        data-bs-target="#change-password-modal"
                    >
                        Change password
                    </button>                    
                    <button 
                        className="btn btn-lg btn-outline-secondary my-3"
                        data-bs-toggle="modal" 
                        data-bs-target="#info-modal"
                    >
                        Info about <span className="fw-bold">animalHouse.</span>
                    </button>
                </div>
            </div>
            
            {/* Info modal */}
            <div className="modal fade" id="info-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Info</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p><span className="fw-bold">animalHouse.</span>is a uni project developed during the 2022 summer.</p>
                            <p>The main goal of the project is to understand some front-end mechanisms and to confirm the skills acquired
                                during the uni course "tecnologie web".
                            </p>
                            <p>The project is developed using <span className="fw-bold">react.js, node express.js, html, css and bootstrap</span></p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Change password modal */}
            <div className="modal fade" id="change-password-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Change password</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit} className="text-center">
                                <div className="form-floating mb-3">
                                    <input 
                                        type="password" 
                                        name="password"
                                        className="form-control" 
                                        onChange={handleChange}
                                        placeholder="password"
                                        required
                                    />
                                    <label htmlFor="password">password</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input 
                                        type="password" 
                                        name="newPassword"
                                        className="form-control" 
                                        onChange={handleChange}
                                        placeholder="new password"
                                        required
                                    />
                                    <label htmlFor="newPassword">new password</label>
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-outline-secondary"
                                    data-bs-dismiss="modal" 
                                >
                                    Change Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default User;