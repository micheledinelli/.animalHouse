import React from "react";
import axios from  "axios";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";

import loginImage from '../assets/undraw_Login_re_4vu2.png';

const SignIn = () => {

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
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                setServerMessage(error.response.data.message);
            }
        }
    }

    return(
        <div className="container mt-2 text-center">
            <h1 className="display-4">Sign In !</h1>
            <div className="row container">
                <div className="col-lg-6">
                    <img src={loginImage} className="img-fluid" alt="loginImage"></img>
                    { serverMessage &&
                        <div className="text-primary">
                            { serverMessage }
                        </div>
                    }
                </div>
                <div className="col-lg-6 align-self-center p-5">
                    <form className="text-center" onSubmit={handleSubmit}>
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