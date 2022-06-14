import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import error from '../assets/undraw_Page_not_found_re_e9o6.png';

const ErrorPage = () => {

    const [seconds, setSeconds] = React.useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        let interval = setInterval(() => {
            setSeconds(seconds => seconds -= 1);
        }, 1000);        
        return () => clearInterval(interval);
    }, [seconds]);

    useEffect(() => {
        if(seconds == 0) {
            return () => { navigate('/'); }
        }
    })

    var errorStyle = {
        height: '70vh',
        textAlign: 'center'
    }

    var imgStyle = {
        height: '100%',
    }

    return(
        <div style={errorStyle} className="erorr-container">
            <img style={imgStyle} src={error} className="img-fluid"></img>   
            <h1 className="display-4">Page not found</h1>
            <p className="lead">You'll be redirected to root page in {seconds} seconds</p>
        </div>
    )
}

export default ErrorPage;