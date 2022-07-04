import React from "react"
import "../../css/memory-game.css"

const MemoryGame = () => {
    return(
        <div>
            <h1>Memory Game!!!</h1>
            <div>
                {/* <div id="gameDiv"></div> */}
                {start()}
            </div>
            <h3 id="msg-box"></h3>
            {/* <input type="button" value="START" id="start-button"></input> */}
        </div>
    )
}



//window.onload = start();

function start() {
    let elements = connect();
    let gameArray = [];

    for(let i=0; i<elements.length; i++){
        let counter = 0;
        while(counter < 2){
            let index = Math.floor(Math.random() * 16);
            if(!gameArray[index]){
                gameArray[index] = elements[i]
                counter++;
            }
        }
    }

    console.log(gameArray)

    let gameDiv = document.createElement("div");
    gameDiv.setAttribute("id","gameDiv");
    // let gameDiv = document.getElementById("gameDiv")
    let i=0;
    let list = gameArray.map((element,index) =>
    <div className="memory-card" key={index} id={index}>
        <img src={element.image_link} id="memory-img"></img>
    </div>
    )

    // for(let i=0; i<gameArray.length; i++){
    //     let tmpDiv = document.createElement("div");
    //     tmpDiv.className = "memory-card";
    //     tmpDiv.setAttribute("id",i);

    //     let tmp = document.createElement("img");
    //     tmp.setAttribute("src",gameArray[i]);
        
    //     tmpDiv.appendChild(tmp);

    //     console.log(i + " " + gameArray[i])
    //     gameDiv.appendChild(tmpDiv);
    // }

    // let startbtn = document.createElement("input");
    // startbtn.type = "button"
    // startbtn.value = "START"
    // startbtn.setAttribute("id","start-button")
    
    return(
        <div id="gameDiv">
            {list}
            <input type="button" value="START" id="start-button" onClick={buttonscript}></input>
        </div>
    )

    // return(gameDiv)
}   

const buttonscript = () =>{ 
        //document.getElementById("start-button").addEventListener("click", () => {
        gameLogic();
        let timerDiv = document.createElement("div");
        timerDiv.setAttribute("id","timer-div");
        document.getElementsByTagName("body")[0].appendChild(timerDiv);
        startTimer();
    }
    //)

function gameLogic() {
    let counter = [];
    let a=0;

    let divArray = document.getElementsByClassName("memory-card");
    for(let i=0; i<divArray.length; i++){
        let j = i;
        
        divArray[j].addEventListener("click", () => {
            if(divArray.length >= 1){
                if(a == 2){
                    document.getElementById(counter[0]).setAttribute("class","memory-card");
                    document.getElementById(counter[1]).setAttribute("class","memory-card");
                    a = 0;
                }

                document.getElementById(j).setAttribute("class","card-selected")
                
                if(j != counter[a-1]){
                    counter[a] = j;
                    a++;

                    if(a ==2 ){
                        if(document.getElementById(counter[0]).innerHTML == document.getElementById(counter[1]).innerHTML){
                            document.getElementById(counter[0]).setAttribute("class","card-guessed");
                            document.getElementById(counter[1]).setAttribute("class","card-guessed");
                            divArray.item[counter[0]] = null;
                            divArray.item[counter[1]] = null;
                            document.getElementById("msg-box").innerHTML = "DONE!!!";
                            a = 0;
                        }else{
                            document.getElementById("msg-box").innerHTML = "RETRY!!!";               
                        }
                    }
                }
            }else{
                document.getElementById("msg-box").innerHTML = "YOU WIN!!!";
            }
        })
    }
}

function startTimer(mydiv){
    let TIME = 60;
    let myTimer = setInterval(() => {
        document.getElementById("timer-div").innerHTML = TIME;
        TIME--;
        if(TIME == -1){
            clearInterval(myTimer);
            clearDisplay();
            start()
        }
    },1000)
}

function clearDisplay(){
    document.getElementById("gameDiv").innerHTML = " ";
}

function connect() {
    let myRequest = new XMLHttpRequest;
    myRequest.open("GET", "https://zoo-animal-api.herokuapp.com/animals/rand/8",false);
    myRequest.send("null")

    let rawData = myRequest.responseText;
    let data = JSON.parse(rawData);
    console.log(data)

    return(data)
}

export default MemoryGame;