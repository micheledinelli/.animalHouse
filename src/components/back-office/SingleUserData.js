import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const SingleUserData = () => {
    
    const userId = useParams().id;
    const [userData, setUserData] = useState({
        id: "",
        name: "",
        surname: "",
        email: "",
        role: "",
    })

    const getUserById = async () => {
        const response = await axios.post(`http://localhost:8080/api/users/${userId}`, {id: userId});
        setUserData(response.data);
    } 

    useEffect(() => {
        
        getUserById();
    
    }, []);

    const deleteUser = async (e) => {
        e.preventDefault();
        const response = await axios.delete(`http://localhost:8080/api/users/${userId}`);
        toast(response.data.message);
    }

    const copyToClipBoard = () => {
        const icon = document.getElementById("copy-to-clipboard-icon");
        icon.classList.remove("bi-clipboard");
        icon.classList.add("bi-clipboard-check");
        toast.success("copied to clipboard");

        window.setTimeout(() => {
            icon.classList.add("bi-clipboard");
            icon.classList.remove("bi-clipboard-check");

        }, 3000);

        navigator.clipboard.writeText(JSON.stringify(userData));
    }

    return(
        <div className="container-fluid">
            <ToastContainer />
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
                                    <li className="nav-item mx-3 my-3">
                                        <a 
                                            className="btn nav-btn btn-outline-light fs-5" 
                                            href="">
                                            Reset pw
                                        </a>
                                    </li>
                                    <li className="nav-item mx-3 my-3">
                                        <a 
                                            className="btn nav-btn btn-outline-light fs-5"
                                            onClick={deleteUser} 
                                            href="">
                                            Delete
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="col-lg-5 d-flex align-items-center justify-content-center">

                    <div className="card shadow-sm position-relative">
                        <div className="position-absolute top-0 start-100 translate-middle">
                            <button 
                                onClick={copyToClipBoard} 
                                className="btn btn-light" 
                                style={{fontSize:"1.8rem"}}
                                data-bs-toggle="tooltip" 
                                data-bs-placement="bottom" 
                                title="Copy as Json"
                            >
                                    <i className="bi bi-clipboard" id="copy-to-clipboard-icon"></i>
                            </button>
                        </div>
                        <div className="card-body">
                            <p className="card-title display-2">{userData.name}</p>
                            <p className="display-6">Info</p>
                            <p className="lead">id: <b>{userData._id}</b></p>
                            <p className="lead">name: <b>{userData.name}</b></p>
                            <p className="lead">surname: <b>{userData.surname}</b></p>
                            <p className="lead">email: <b>{userData.email}</b></p>
                            <p className="lead">role: <b>{userData?.role || 1000}</b></p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5">
                    <h1>Preferences and points</h1>
                </div>
            </div>
        </div>
    )
}

export default SingleUserData;