import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    
    return(
        <div className="container">
            <div className="row mt-5">
                <div className="col-lg-4">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a>
                                <i className="bi bi-house"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <p className="card-title display-2">{userData.name}</p>
                            <p className="display-6">Info</p>
                            <p className="lead">id: <b>{userData.id}</b></p>
                            <p className="lead">name: <b>{userData.name}</b></p>
                            <p className="lead">surname: <b>{userData.surname}</b></p>
                            <p className="lead">email: <b>{userData.email}</b></p>
                            <p className="lead">role: <b>{userData.role}</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleUserData;