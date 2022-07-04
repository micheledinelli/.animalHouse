import axios from "axios";
import { useEffect, useState } from "react";

//style
import "../../css/frontOffice.css";

//icons
import "../../../node_modules/bootstrap-icons/font/bootstrap-icons.css";


const FrontOffice = () => {

    const [dataHangman, setDataHangman] = useState();    
    
    useEffect(() => {

        getUsersData();

        //menuToggle
        let toggle = document.querySelector('.toggle');
        let navigation = document.querySelector('.navigation');
        let main = document.querySelector('.main');

        toggle.onclick = function(){
            navigation.classList.toggle('active'); 
            main.classList.toggle('active'); 
        }

    }, [])  

    const getUsersData = async function(){
        const response = await axios.get("http://localhost:8080/api/scores/hangman");
         console.log(response.data);
         setDataHangman(response.data);
    }
   
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

                 <div className="titlePage">
                    <h2 data-text="LeaderBoard" className="titleLeaderBoard" >LeaderBoard</h2>
                 </div>
                 
                 <div className="cardBox">
                    
                    <div className="card">
                        <div>
                            <div className="email">awniyoussef@gmail.com</div>
                            <div className="numbers">990</div>
                            <div className="cardName">Score</div>
                        </div>
                        <div className="iconBox">
                            <i className="bi bi-joystick"></i>
                        </div>
                    </div>

                    <div className="card">
                        <div>
                            <div className="email">micheledine@gmail.com</div>
                            <div className="numbers">910</div>
                            <div className="cardName">Score</div>
                        </div>
                        <div className="iconBox">
                            <i className="bi bi-joystick"></i>
                        </div>
                    </div>

                    <div className="card">
                        <div>
                            <div className="email">pipfilippo44@gmail.com</div>
                            <div className="numbers">901</div>
                            <div className="cardName">Score</div>
                        </div>
                        <div className="iconBox">
                            <i className="bi bi-joystick"></i>
                        </div>
                    </div>

                    <div className="card">
                        <div>
                            <div className="email">fede@gmail.com</div>
                            <div className="numbers">120</div>
                            <div className="cardName">Score</div>
                        </div>
                        <div className="iconBox">
                            <i className="bi bi-joystick"></i>
                        </div>
                    </div>
                 </div>

                <div className="details">
                    <div className="standings-hangman"> 
                        <div className="cardHeader">
                            <h2>Placing Hangman <i className="bi bi-arrow-down-square-fill"></i></h2>
                            <a href="#" className="btn">View all</a>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <td>Position</td>
                                    <td>Name</td>
                                    <td>Email</td>
                                    <td>Score</td>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Pinaccio</td>
                                    <td>awniyoussef@gmail.com</td>
                                    <td>990</td>
                                   
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Mich</td>
                                    <td>micheledine@gmail.com</td>
                                    <td>910</td>
                                    
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Pippo</td>
                                    <td>pipfilippo44@gmail.com</td>
                                    <td>901</td>
                                    
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Pinaccio</td>
                                    <td>awniyoussef@gmail.com</td>
                                    <td>990</td>
                                   
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Mich</td>
                                    <td>micheledine@gmail.com</td>
                                    <td>910</td>
                                   
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Pippo</td>
                                    <td>pipfilippo44@gmail.com</td>
                                    <td>901</td>
                                    
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>Pinaccio</td>
                                    <td>awniyoussef@gmail.com</td>
                                    <td>990</td>
                                    
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>Mich</td>
                                    <td>micheledine@gmail.com</td>
                                    <td>910</td>
                                    
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>Pippo</td>
                                    <td>pipfilippo44@gmail.com</td>
                                    <td>901</td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="recentOnline">
                        <div className="cardHeader">
                            <h2>Recent Online Players</h2>
                        </div>
                        <table>
                           <tr>Mich</tr>
                           <tr>Pippo</tr>
                           <tr>Fede</tr>
                           <tr>Pino</tr>
                           <tr>Kica</tr>
                           <tr>Mich</tr>
                           <tr>Max</tr>
                           <tr>Mich</tr>
                           <tr>Mich</tr>
                           <tr>Mich</tr>
                           <tr>Mich</tr>
                           <tr>Mich</tr>
                           <tr>Mich</tr>
                           <tr>Mich</tr>
                           <tr>Mich</tr>
                           <tr>Mich</tr>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default FrontOffice;