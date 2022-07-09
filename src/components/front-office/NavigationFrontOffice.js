import React from "react";
import { Link } from "react-router-dom";

const NavigationFrontOffice = () => {
    
    return (
        <div className="navigation">
            <ul>
                <li>
                    <a href="#">
                        <span className="icon"><i className="bi bi-building"></i></span>
                        <span className="title">  Front Office</span>
                    </a>
                </li>
                <li>
                    <a href="/frontOffice">
                        <span className="icon"><i className="bi bi-controller"></i></span>
                        <span className="title">LeaderBoard</span>
                    </a>
                </li>
                <li>
                    <a href="/frontOffice/bacheca">
                        <span className="icon"><i className="bi bi-chat-heart"></i></span>
                        <span className="title"> Bacheca </span>
                    </a>
                </li>
                <li>
                    <a href="/frontOffice/services">
                        <span className="icon"><i className="bi bi-chat-heart"></i></span>
                        <span className="title">Our Services</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default NavigationFrontOffice;