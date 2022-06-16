import React from "react";
import axios from  "axios";
import { useNavigate, Link } from "react-router-dom";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";

import registerImage from '../assets/undraw_welcome_cats_thqn.png';

const SignUp = () => {

    const navigate = useNavigate();

    const [serverMessage, setServerMessage] = React.useState();

    const [data, setData] = React.useState({
        name: "",
        surname: "",
        email: "",
        password: ""
    });

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/users";
            const {data: res} = await axios.post(url, data);
            setServerMessage(res.message);
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                setServerMessage(error.response.data.message);
            }
        }
    }

    return(
        <div className="container mt-2 text-center">
            <h1 className="display-4">Sign Up!</h1>
            <div className="row container">
                <div className="col-lg-6 align-self-center p-5">
                    <form className="text-center" onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-around">
                            <div className="form-floating mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="name" 
                                    onChange={handleChange}
                                    value={data.name}
                                    placeholder="name" 
                                    required 
                                />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="surname" 
                                    onChange={handleChange}
                                    value={data.surname}
                                    placeholder="surname" 
                                    required 
                                />
                                <label htmlFor="surname">Surname</label>
                            </div>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                type="email" 
                                className="form-control" 
                                name="email" 
                                onChange={handleChange}
                                value={data.email}
                                placeholder="name@example.com" 
                                required 
                            />
                            <label htmlFor="email">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input 
                                type="password" 
                                className="form-control" 
                                name="password" 
                                onChange={handleChange}
                                value={data.password}
                                placeholder="Password" 
                                required 
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <button type="submit" className="btn btn-outline-secondary mt-3">Submit</button>                            
                    </form>
                    <div className="container text-center mt-3">
                        <p className="text-center">or</p>
                        <a className="btn btn-outline-primary mx-2" href="/signIn">Sign In</a>
                    </div>
                </div>
                <div className="col-lg-6">
                    <img src={registerImage} className="img-fluid" alt="loginImage"></img>
                    {
                        serverMessage && <span className="text-primary">{serverMessage}</span>
                    }
                </div>
            </div>
        </div>
    );

}

export default SignUp;