import React from "react";

//style
import "../../css/frontOffice.css";

//icons
import "../../../node_modules/bootstrap-icons/font/bootstrap-icons.css";

const FrontOffice = () => {
    return(
        <div className="class-container">
            <div className="navigation">
                <ul>
                    <li>
                        <a href="#">
                            <span className="icon"><i className="bi bi-building"></i></span>
                            <span className="title">  Front Office</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="icon"><i className="bi bi-controller"></i></span>
                            <span className="title">  LeaderBoard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="icon"><i className="bi bi-chat-heart"></i></span>
                            <span className="title"> Bacheca</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
      
    )
}

export default FrontOffice;