import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "../../css/memory-game.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {useStateWithCallback} from '../../hooks/useStateWithCallback';

const MemoryGame = () => {

    const [cards, setCards] = useState();
    const [lastCard, setLastCard] = useState(null);
    const [matches, setMatches] = useStateWithCallback(0);
    const [guestUsername, setGuestUsername] = useState('');
    const [win, setWin] = useState(false);
    const [fisrtClick, setFisrtClick] = useState(true);
    const elapsed = useRef(0);

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if(!win) {
            let timer;
            if(!fisrtClick) {
                timer = setInterval(() => {
                    elapsed.current = elapsed.current + 1;
                }, 1000);
            }

            return () => {
                clearInterval(timer);
            }
        }
    }, [fisrtClick, win])

    const getData = async () => {
        try {
            const response = await axios.get(`https://zoo-animal-api.herokuapp.com/animals/rand/8`);        
            
            const mapArr = response.data.map((e, index) => {
                return { e, value: index, flipped: false, matched: false, blocked: false, wrong: false }
            });

            const dupArr = [...mapArr, ...mapArr];

            // Shuffle
            dupArr.sort(() => Math.random() - 0.5);
            setCards(dupArr);

        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            } 
        }
    }

    const postStats = async (points) => {
        if(window.localStorage.getItem("authenticator") || guestUsername != '') {
            let userIdentifier = window.localStorage.getItem("user_email") || guestUsername + " (guest)";
            let body = {
                userId: userIdentifier,
                points: points,
                gameName: 'memory'
            }
            try {
                const response = await axios.post("http://localhost:8080/api/scores", body);
                toast.success(response.data.message); 
            } catch (error) {
                toast.error(error.data.message);
            }
        }
    }

    const handleGuestUserChange = ({target: input}) => {
        setGuestUsername(input.value);
    }

    const Card = (props) => {

        if(props.flipped) {

            return(
                <div className="memory-card">
                    <img
                        className="img-fluid" 
                        onClick={(e) => handleClick(props.value, props.index)}
                        src={props.src}>
                    </img>
                </div>
            )
        } else {
            return(
                <div 
                    className="memory-card" 
                    style={{cursor:"pointer"}}
                    onClick={(e) => handleClick(props.value, props.index)}
                >
                    <span>

                    </span>
                </div>
            )
        }
    }

    const handleClick = (value, index) => {
        if(cards[index].blocked) { return; }
        if(fisrtClick) {
            setFisrtClick(false);
        }
        
        let cardsCopy = JSON.parse(JSON.stringify(cards)); ;
        cardsCopy[index].flipped = !cardsCopy[index].flipped;
        cardsCopy[index].blocked = true;
        
        if(lastCard && lastCard.card.value === cardsCopy[index].value) {
            cardsCopy[index].matched = true;
            cardsCopy[lastCard.index].matched = true;
            
            setMatches(matches + 1, (prevValue, newValue) => {
                checkWin(newValue);
            });

            setLastCard(null);

        } else if(lastCard && lastCard.value !== cardsCopy[index].value) {
            setTimeout(() => {
                cardsCopy[index].flipped = !cardsCopy[index].flipped;
                cardsCopy[lastCard.index].flipped = !cardsCopy[lastCard.index].flipped;
                cardsCopy[index].wrong = true;
                cardsCopy[lastCard.index].wrong = true;
    
                cardsCopy[index].blocked = false;
                cardsCopy[lastCard.index].blocked = false;
            }, 1000);
            setLastCard(null);
        } else if(!lastCard) {
            let last = {
                card: cardsCopy[index],
                index: index
            }
            setLastCard(last);
        }

        setCards(cardsCopy);
    }

    const checkWin = (matches) => {
        if(matches === cards.length / 2) {
            setWin(true);
            toast.success("YOU WON !");
            let points = 150 - (elapsed.current * 0.5);
            postStats(points);
        }
    }

    return(
        <div className="container-fluid position-relative">
            <ToastContainer />
            <p className="display-4 text-center lead">Memory</p>
            {
                !window.localStorage.getItem("authenticator") 
                    && guestUsername == ''
                    &&
                        <button 
                            className="position-absolute mt-3 me-3 top-0 end-0 btn btn-secondary"
                            data-bs-toggle="modal"
                            data-bs-target="#guestInfoModal"
                        >
                            add info
                        </button>
            }
            {
                win && 
                    <div className="container text-center my-3">
                        <p className="lead display-6">Time elapsed: {elapsed.current}</p>
                        <p className="lead">Points: {150 - (elapsed.current * 0.5)}</p>
                        <button 
                            className="btn btn-primary btn-lg my-3 mx-3"
                            onClick={(e) => { window.location.href = window.location.href }}
                        >
                            <i class="bi bi-arrow-clockwise"></i>
                        </button>
                        <a href="/gamePage" className="btn btn-light btn-lg my-3 mx-3">Go back</a>
                    </div>
            }
            <div className="memory-main-container">
                <div className="memory-field-container">
                    {
                        cards && cards.map((e, index) => (
                            <Card 
                                key={index}
                                src={e.e.image_link} 
                                handleClick={handleClick}
                                value={e.value}
                                index={index}
                                flipped={e.flipped}
                                wrong={e.wrong}
                            />
                        ))
                    }
                </div>
            </div>
            {/* Guest user modal */}
            <div className="modal fade" id="guestInfoModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Guest info</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center">
                            <p>Help us to save your performance: choose a username</p>
                            <p>or</p>
                            <p><a href="/signIn">sign in</a></p>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    name="guestUsername"
                                    className="form-control"
                                    placeholder="(guest)"
                                    autoComplete="off"
                                    onChange={handleGuestUserChange}
                                    required
                                />
                                <label htmlFor="guestUsername">(guest)</label>
                            </div>
                            <button
                                className="btn btn-outline-secondary"
                                data-bs-dismiss="modal"
                                onClick={(e) => {e.preventDefault(); toast.success("your guest username is: " + guestUsername)}}
                            >
                                confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default MemoryGame;
