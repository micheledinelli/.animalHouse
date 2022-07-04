import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useStateWithCallback } from "../../hooks/useStateWithCallback";

const Quiz = () => {

    const [animals, setAnimals] = useState([]);
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
            "Crotalus horridus", "Otidiphaps nobilis aruensis"
            ],
        "animal_type": ["Mammal", "Bird"] ,
        "weight_max": [50, 12.2, 18, 120, 0.6, 3, 31, 1]  ,
        "weight_min": [0.1, 0.01, 0.05, 0.5, 3, 15, 7, 29] ,
        "active_time": ["Diurnal", "Nocturnal", "Both"] , 
        "length_max": [50, 12.2, 18, 120, 0.6, 3, 31, 1] ,
        "length_min": [0.1, 0.01, 0.05, 0.5, 3, 15, 7, 29] ,
        "diet": ["Grass", "Small animals, such as insects and frogs, and eggs"] ,
        "lifespan": [1, 2, 5, 10, 15, 20, 27, 30, 50, 75] ,
        "geo_range": ["Southern Moluccas, Indonesia", "Bali, Indonesia", "South America"] ,
        "habitat": ["Savannah", "Grasslands and rainforest", "Mountain and forest"] ,
    }

    const loadingCounter = useRef(0);
    const numberOfQuestions = 8;
    const answerCounter = useRef(1);

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

        answerMap[answerCounter.current] = answer;
        answerCounter.current += 1;
        return {question: question, answer: answer, questionType: attribute}; 
    }

    const generateRandomAlt = (questionType) => {
        let rand = Math.round(Math.random() * ( alternatives[questionType].length - 1));
        if(!alternatives[questionType][rand]) {
            console.log(alternatives[questionType], rand);
        }
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
                correctAnswers += 10;
            } else {
                errors += 1;
            }
        }

        let points = ( correctAnswers * 15 ) - ( errors * 5 );
        console.log(points);
    }

    const imageLoaded = () => {
        loadingCounter.current += 1;
        if (loadingCounter.current >= numberOfQuestions) {
            setLoading(false);
        }
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

        return(
            <> 
                <div className="form-check mb-2">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name={`${props.index}`} 
                        id={`inlineRadio1-${props.index}`} 
                        value={answerPostion == 1 ? props.answer : generateRandomAlt(props.questionType)} 
                    />
                    <label className="form-check-label" htmlFor={`inlineRadio1-${props.index}`}>
                        {answerPostion == 1 ? props.answer : generateRandomAlt(props.questionType)} 
                    </label>
                </div>
                <div className="form-check mb-2">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name={`${props.index}`} 
                        id={`inlineRadio2-${props.index}`} 
                        value={answerPostion == 2 ? props.answer : generateRandomAlt(props.questionType)} 
                    />
                    <label className="form-check-label" htmlFor={`inlineRadio3-${props.index}`}>
                        {answerPostion == 2 ? props.answer : generateRandomAlt(props.questionType)}  
                    </label>
                </div>
                <div className="form-check mb-2">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name={`${props.index}`} 
                        id={`inlineRadio3-${props.index}`} 
                        value={answerPostion == 3 ? props.answer : generateRandomAlt(props.questionType)}  
                    />
                    <label className="form-check-label"htmlFor={`inlineRadio3-${props.index}`}>
                        {answerPostion == 3 ? props.answer : generateRandomAlt(props.questionType)} 
                    </label>
                </div>
            </>
        )
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
        <div className="container-fluid bg-secondary 100vh">
            <ToastContainer />
            <p className="display-4 text-center text-white">It's time to sQUIZ your brain!</p>
            <form onSubmit={handleSubmit} style={{padding:"0"}}>
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
        </div>
    );
}

export default Quiz;