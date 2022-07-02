import React, { useEffect } from "react";

//style
import "../../css/frontOffice.css";

//icons
import "../../../node_modules/bootstrap-icons/font/bootstrap-icons.css";

const FrontOffice = () => {
    
    useEffect(() => {
        //menuToggle
        let toggle = document.querySelector('.toggle');
        let navigation = document.querySelector('.navigation');
        let main = document.querySelector('.main');

        toggle.onclick = function(){
            navigation.classList.toggle('active'); 
            main.classList.toggle('active'); 
        }

    }, [])  
   
    return(
        <div className=" class-container">
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
            <div className="main">
                 <div className="topbar">
                    <div className="toggle">
                        <i className="bi bi-list"></i>
                    </div>
                 </div>
            </div>
    
        </div>
    )
}

export default FrontOffice;