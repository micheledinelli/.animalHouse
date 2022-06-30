import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';

import Hangman0 from "../../assets/hangman-states/0.png";
import Hangman1 from "../../assets/hangman-states/1.png";
import Hangman2 from "../../assets/hangman-states/2.png";
import Hangman3 from "../../assets/hangman-states/3.png";
import Hangman4 from "../../assets/hangman-states/4.png";
import Hangman5 from "../../assets/hangman-states/5.png";
import Hangman6 from "../../assets/hangman-states/6.png";

const Hangman = () => {

    const [randomWord, setRandomWord] = useState();
    const userGuess = [];

    useEffect(() => {
        getRandomWord();
    }, []);

    // Produce the word on the screen
    useEffect(() => {
        if(randomWord) {
            console.log(randomWord);
            const rootDiv = document.getElementById("guess-word-div");
            let vowels = ["a", "e", "i", "o", "u"];
            for(let i = 0; i < randomWord.length; i++) {
                let div = document.createElement("div");
                let input = document.createElement("input");
                let p = document.createElement("p");
                
                div.classList.add("p-2");
                
                input.type = "text";
                input.classList.add("form-control");
                input.classList.add("form-control-lg");
                input.onchange = handleChange;
                input.name = i;

                p.classList.add("fw-bold");
                p.classList.add("display-6");

                if(randomWord[i] != ' ' && vowels.includes(randomWord[i])) {
                    p.innerHTML = '+';
                
                } else if(randomWord[i] == ' ') {
                   input.disabled = "true";
                   userGuess[i] = " ";
                } else {
                    p.innerHTML = '-';
                }

                div.appendChild(input);
                div.appendChild(p);
                rootDiv.appendChild(div);
                
            }
        }
    }, [randomWord])

    const getRandomWord = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/animals/rand");
            setRandomWord(response.data);
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            }
        }
    }

    const handleChange = ({currentTarget: input}) => {
        userGuess[Number(input.name)] = input.value; 
    }

    const handleDifficult = (e) => {
        e.preventDefault();

        if(e.target.value == 0) {
            //setUncovered()
        } else if(e.target.value == 1) {
            //setUncovered()
        } else if(e.target.value == 2) {
            //setUncovered()
        }

    }

    const checkWin = (e) => {
        e.preventDefault();
        if(randomWord == userGuess.join("")) {
            alert("winner");
        }
    }

    return(
        <div className="container-fluid text-center">
            <ToastContainer />
            <p className="display-4">Welcome to <b>hangman</b></p>
            <div className="container d-flex justify-content-center">
                <button className="btn btn-outline-secondary mx-3" value={0} onClick={handleDifficult}>Easy</button>
                <button className="btn btn-outline-secondary mx-3" value={1} onClick={handleDifficult}>Medium</button>
                <button className="btn btn-outline-secondary mx-3" value={2} onClick={handleDifficult}>Hard</button>
            </div>
            <div className="row container text-center">
                <div className="col-lg-6 bg-secondary p-5 rounded-circle mt-3">
                    <img id="hangman-state" src={Hangman0} className="img-fluid hangman-img"></img>
                </div>
                <div className="col-lg-6 d-flex align-items-center mt-5">
                    <form className="p-5">
                        <div className="d-flex flex-row mb-3" id="guess-word-div">
                        </div>  
                        <button className="btn btn-outline-success" onClick={checkWin}>Guess</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Hangman;