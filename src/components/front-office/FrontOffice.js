import axios from "axios";
import { useEffect, useState } from "react";

//style
import "../../css/frontOffice.css";

//icons
import "../../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import NavigationFrontOffice from "./NavigationFrontOffice";


const FrontOffice = () => {

    //Scores of the hangman game
    const [dataHangman, setDataHangman] = useState();    

    //Scores of the memory game
    const [dataMemory, setDataMemory] = useState();

    //Scores of the quiz game
    const [dataQuiz, setDataQuiz] = useState();    

    useEffect(() => {

        getUsersDataHangman();
        getUsersDataMemory();
        getUsersDataQuiz();

        //menuToggle
        let toggle = document.querySelector('.toggle');
        let navigation = document.querySelector('.navigation');
        let main = document.querySelector('.main');

        toggle.onclick = function(){
            navigation.classList.toggle('active'); 
            main.classList.toggle('active'); 
        }

    }, [])  

    const getUsersDataHangman = async function(){
        const response = await axios.get("http://localhost:8080/api/scores/hangman");
         console.log(response.data);
         setDataHangman(response.data);
    }
    const getUsersDataMemory = async function(){
        const response = await axios.get("http://localhost:8080/api/scores/memory");
         console.log(response.data);
         setDataMemory(response.data);
    }
    const getUsersDataQuiz = async function(){
        const response = await axios.get("http://localhost:8080/api/scores/quiz");
         console.log(response.data);
         setDataQuiz(response.data);
    }
   
    return(
        <div className=" class-container">
            
           <NavigationFrontOffice />

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

                    <div className="standings"> 
                        <div className="cardHeader">
                            <h2>Placing Hangman <i className="bi bi-arrow-down-square-fill"></i></h2>
                        </div>
                        <table className="tableGame">
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>UserName</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataHangman && dataHangman.sort((a,b) => b.points - a.points).map((e, index) => (
                                    <tr key={e._id}>
                                        <td>{index +1 }</td>
                                        <td>{e.userId}</td>
                                        <td>{e.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                                
                    <div className="standings"> 
                        <div className="cardHeader">
                            <h2>Placing Memory <i className="bi bi-arrow-down-square-fill"></i></h2>
                        </div>
                        <table className="tableGame">
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>UserName</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataMemory && dataMemory.sort((a,b) => b.points - a.points).map((e, index) => (
                                    <tr key={e._id}>
                                        <td>{index +1 }</td>
                                        <td>{e.userId}</td>
                                        <td>{e.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    
                    <div className="standings"> 
                        <div className="cardHeader">
                            <h2>Placing Quiz <i className="bi bi-arrow-down-square-fill"></i></h2>
                        </div>
                        <table className="tableGame">
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>UserName</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataQuiz && dataQuiz.sort((a,b) => b.points - a.points).map((e, index) => (
                                    <tr key={e._id}>
                                        <td>{index +1 }</td>
                                        <td>{e.userId}</td>
                                        <td>{e.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default FrontOffice;