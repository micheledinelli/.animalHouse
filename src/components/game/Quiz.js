import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useStateWithCallback } from "../../hooks/useStateWithCallback";

const Quiz = () => {

    const [animals, setAnimals] = useState([]);
    const [guestUsername, setGuestUsername] = useState('');
    const [loading, setLoading] = useState(true);

    const answerMap = {
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
    }
    
    const fieldList = ["name", "latin_name", "animal_type", "active_time", "length_min",
                "length_max" , "diet", "geo_range", "habitat", "lifespan", "weight_min", "weight_max"];
    
    const [questionList] = useState({
        "name": "What is the animal's name?",
        "latin_name": "What is the animal's latin name?",
        "animal_type": "What is its animal type?",
        "weight_max": "Does it look heavy? guess its max weight!",
        "weight_min": "Does it look heavy? guess its min weight!",
        "active_time": "Do you think it enjoys light?",
        "length_max": "Do you think it grows much? Try to guess its max length",
        "length_min": "Guess its minimum length!",
        "diet": "What does it eat?",
        "lifespan": "Hoping for the best... try to guess its lifespan!",
        "geo_range": "Guess its geo-range!",
        "habitat": "Guess its habitat!",
    });
       
    const alternatives = {
        "name": ["Octopus", "Leopard", "Cat", "Dog", "Elephant", "Tiger", "African Painted Dog"]  ,
        "latin_name": 
            ["Geoemyda spengleri", "Varanus ornatus", "Vicugna pacos", 
            "Trichechus manatus latirostris", "Fratercula corniculata",
            "Crotalus horridus", "Otidiphaps nobilis aruensis", "Choloepus didactylus"
            ],
        "animal_type": ["Mammal", "Bird"] ,
        "weight_max": [50, 12.2, 18, 120, 0.6, 3, 31, 1]  ,
        "weight_min": [0.1, 0.01, 0.05, 0.5, 3, 15, 7, 29] ,
        "active_time": ["Diurnal", "Nocturnal", "Both"] , 
        "length_max": [50, 12.2, 18, 120, 0.6, 3, 31, 1] ,
        "length_min": [0.1, 0.01, 0.05, 0.5, 3, 15, 7, 29] ,
        "diet": ["Grass", "Small animals, such as insects and frogs, and eggs", "Mosquito larva"] ,
        "lifespan": [1, 2, 5, 10, 15, 20, 27, 30, 50, 75] ,
        "geo_range": ["Southern Moluccas, Indonesia", "Bali, Indonesia", "South America"] ,
        "habitat": ["Savannah", "Grasslands and rainforest", "Mountain and forest"] ,
    }

    const loadingCounter = useRef(0);
    const numberOfQuestions = 8;
    var answerCounter = 1;

    useEffect(() => {
        
        getRandomAnimals();

    }, [])

    const getRandomAnimals = async () => {
        try {
            const response = await axios.get(`https://zoo-animal-api.herokuapp.com/animals/rand/${numberOfQuestions}`);        
            console.log(response.data);
            setAnimals(response.data);
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            } 
        }
    }

    // Generates a random field name (e.g max_weight)
    const getRandomAttribute = () => {
        let rand = Math.round(Math.random() * (fieldList.length - 1) );
        return fieldList[rand];
    }

    const generateRandomQuestion = (animal) => {
        let attribute = getRandomAttribute();
        let question = questionList[attribute];
        let answer = animal[attribute];

        answerMap[answerCounter] = answer;
        answerCounter += 1;
        return {question: question, answer: answer, questionType: attribute}; 
    }

    const generateRandomAlt = (questionType) => {
        let rand = Math.round(Math.random() * ( alternatives[questionType].length - 1));
        return alternatives[questionType][rand];
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        
        let correctAnswers = 0;
        let errors = 0;
        for(const [name,value] of data) {
            
            // Correct Answer
            if(answerMap[name] === value) {
                correctAnswers += 1;
            } else {
                errors += 1;
            }
        }

        let points = ( correctAnswers * 15 ) - ( errors * 5 );
        toast.success("Congrats, you answerd at " + correctAnswers + " correctly! you earned " + points);
        postStats(points);
        reset();
    }

    const postStats = async (points) => {
        if(window.localStorage.getItem("authenticator") || guestUsername != '') {
            let userIdentifier = window.localStorage.getItem("user_email") || guestUsername + " (guest)";
            let body = {
                userId: userIdentifier,
                points: points,
                gameName: 'quiz'
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

    const imageLoaded = () => {
        loadingCounter.current += 1;
        if (loadingCounter.current >= numberOfQuestions) {
            setLoading(false);
        }
    }

    const reset = () => {
        const rootDiv = document.querySelector(".root-div-quiz");
        rootDiv.classList.add("text-center");
        rootDiv.innerHTML = '';

        let playAgainBtn = document.createElement("button");
        playAgainBtn.classList.add("btn");
        playAgainBtn.classList.add("btn-light");
        playAgainBtn.classList.add("btn-lg");
        playAgainBtn.classList.add("mx-3");
        playAgainBtn.classList.add("my-3");
        playAgainBtn.onclick = () => {
            window.location.href = window.location.href;
        }
        playAgainBtn.innerHTML = '<i class="bi bi-arrow-clockwise"></i>';

        let goBackBtn = document.createElement("a");
        goBackBtn.classList.add("btn");
        goBackBtn.classList.add("btn-light");
        goBackBtn.classList.add("btn-lg");
        goBackBtn.classList.add("mx-3");
        goBackBtn.classList.add("my-3");
        goBackBtn.href = "/gamePage";
        goBackBtn.innerHTML = '<i class="bi bi-house"></i>';

        rootDiv.appendChild(playAgainBtn);
        rootDiv.appendChild(goBackBtn);
    }

    const imageStyle = {
        height: "100%",
        objectFit: "contain"
    }

    const imageContainerStyle = {
        height: "20rem",
        width: "100%"
    }

    const AnswerOptions = (props) => {

        let rand1 = Math.random();
        let rand2 = Math.random();
        let rand3 = Math.random();
        let answerPostion = 0;
        if( rand1 > rand2 && rand1 > rand3 ) {
            answerPostion = 1;
        } else if( rand2 > rand1 && rand2 > rand3 ) {
            answerPostion = 2;
        } else {
            answerPostion = 3;
        }

        if(props.questionType == "active_time") {
            let alt = "";
            if(props.answer == "Diurnal") {
                alt = "Nocturnal"
            } else {
                alt = "Diurnal"
            }
            
            return(
                <>
                    <div className="form-check mb-2">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name={`${props.index}`} 
                            id={`inlineRadio1-${props.index}`} 
                            value={props.answer} 
                        />
                        <label className="form-check-label" htmlFor={`inlineRadio1-${props.index}`}>
                            {props.answer} 
                        </label>
                    </div>
                    <div className="form-check mb-2">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name={`${props.index}`} 
                            id={`inlineRadio2-${props.index}`} 
                            value={alt} 
                        />
                        <label className="form-check-label" htmlFor={`inlineRadio3-${props.index}`}>
                            {alt}  
                        </label>
                    </div>
                    <div className="form-check mb-2">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name={`${props.index}`} 
                            id={`inlineRadio3-${props.index}`} 
                            value={"Both"} 
                        />
                        <label className="form-check-label" htmlFor={`inlineRadio3-${props.index}`}>
                            {"Both"}  
                        </label>
                    </div>
                </>
            )

        } else {
            
            let alt1 = generateRandomAlt(props.questionType);
            let alt2 = generateRandomAlt(props.questionType);
            let alt3 = generateRandomAlt(props.questionType);
            
            return(
                <> 
                    <div className="form-check mb-2">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name={`${props.index}`} 
                            id={`inlineRadio1-${props.index}`} 
                            value={answerPostion == 1 ? props.answer : alt1} 
                        />
                        <label className="form-check-label" htmlFor={`inlineRadio1-${props.index}`}>
                            {answerPostion == 1 ? props.answer : alt1} 
                        </label>
                    </div>
                    <div className="form-check mb-2">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name={`${props.index}`} 
                            id={`inlineRadio2-${props.index}`} 
                            value={answerPostion == 2 ? props.answer : alt2} 
                        />
                        <label className="form-check-label" htmlFor={`inlineRadio3-${props.index}`}>
                            {answerPostion == 2 ? props.answer : alt2}  
                        </label>
                    </div>
                    <div className="form-check mb-2">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name={`${props.index}`} 
                            id={`inlineRadio3-${props.index}`} 
                            value={answerPostion == 3 ? props.answer : alt3}  
                        />
                        <label className="form-check-label"htmlFor={`inlineRadio3-${props.index}`}>
                            {answerPostion == 3 ? props.answer : alt3} 
                        </label>
                    </div>
                </>
            )
        }
    }

    const QuestionCard = (props) => {
        return(
            <div className="container my-3">
                <div className="card shadow-sm"> 
                    <div className="card-body">
                        <div className="image-container" style={imageContainerStyle} >
                            <div style={{display: loading ? "block" : "none"}} className="text-center">
                                <div className="spinner-border text-primary" role="status" style={{width: "3rem", height: "3rem"}}>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <div style={{display: loading ? "none" : "block", height: "20rem", width: "100%"}}>
                                <img 
                                    src={props.image_link}
                                    style={imageStyle}
                                    onLoad={imageLoaded}
                                />
                            </div>
                        </div>
                        <div style={{display: loading ? "block" : "none"}} className="text-center">

                        </div>
                        <div style={{display: loading ? "none" : "block"}}>
                            <h4 className="card-title mt-3"># {props.index}</h4>
                            <p className="card-text lead">
                                {props.questionAnswer.question}
                            </p>
                            
                            <AnswerOptions 
                                index={props.index} 
                                answer={props.questionAnswer.answer}
                                questionType={props.questionAnswer.questionType}
                            />
                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="container-fluid bg-secondary position-relative">
            <ToastContainer />
            <p className="display-4 text-center text-white">It's time to sQUIZ your brain!</p>
            {
                !window.localStorage.getItem("authenticator") 
                    && guestUsername == ''
                    &&
                        <button 
                            className="position-absolute mt-3 me-3 top-0 end-0 btn btn-light"
                            data-bs-toggle="modal"
                            data-bs-target="#guestInfoModal"
                        >
                            add info
                        </button>
            }
            <div className="root-div-quiz">
                <form onSubmit={handleSubmit} style={{padding:"0"}} >
                    <div className="row mt-5">
                            {
                                animals && 
                                    animals.map((animal, i) => (
                                        <div className="col-lg-6" key={animal.image_link}>
                                            <QuestionCard 
                                                image_link={animal.image_link} 
                                                questionAnswer={generateRandomQuestion( animal )}
                                                index={i + 1}
                                            />
                                        </div>
                                    ))
                            }
                    </div>
                    <div className="text-center my-3">
                        <button className="btn btn-success btn-lg">Submit</button>
                    </div>
                </form>
                <div className="text-center text-white mt-5">
                    <p className="lead">Animal data supplied by
                        <a href="https://zoo-animal-api.herokuapp.com/"> https://zoo-animal-api.herokuapp.com/</a>
                    </p>
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
        </div>
    );
}

export default Quiz;