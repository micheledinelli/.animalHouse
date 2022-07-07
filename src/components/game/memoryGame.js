import React from "react"
import "../../css/memory-game.css"

const MemoryGame = () => {
    // return(
    //     <div className="container-fluid bg-secondary position-relative">
    //         <p className="display-4 text-center text-white">Memory Game!!!</p>
    //         <div className="container-fluid position-relative">
    //             {start()}
    //         </div>
    //         <h3 id="msg-box"></h3>
    //     </div>
    // )
}

// function start() {
//     let elements = connect();
//     let gameArray = [];

//     for(let i=0; i<elements.length; i++){
//         let counter = 0;
//         while(counter < 2){
//             let index = Math.floor(Math.random() * 16);
//             if(!gameArray[index]){
//                 gameArray[index] = elements[i]
//                 counter++;
//             }
//         }
//     }


//     let gameDiv = document.createElement("div");
//     gameDiv.setAttribute("id","gameDiv");

//     let list = gameArray.map((element,index) =>
//     <div className="memory-card" key={index} id={index}>
//         <img src={element.image_link} id="memory-img" alt={element.name}></img>
//     </div>
//     )
    
//     return(
//         <div className="position-relative">
//             <div id="gameDiv" className="container">
//                 {list}
//             </div>
//             <input type="button" className="btn btn-light position-absolute top-50 start-10" value="START" id="start-button" onClick={buttonscript}></input>
//             <p id="timer-div" className="display-4 position-absolute top-50 end-0 text-white">0</p>
//         </div>
//     )
// }   

// const buttonscript = () =>{ 
//         gameLogic();
//         // let timerDiv = document.createElement("div");
//         // timerDiv.setAttribute("id","timer-div");
//         // document.getElementsByTagName("body")[0].appendChild(timerDiv);
//         startTimer();
//     }

// function gameLogic() {
//     let counter = [];
//     let a=0;

//     let divArray = document.getElementsByClassName("memory-card");
//     for(let i=0; i<divArray.length; i++){
//         let j = i;
        
//         divArray[j].addEventListener("click", () => {
//             if(divArray.length >= 1){
//                 if(a === 2){
//                     document.getElementById(counter[0]).setAttribute("class","memory-card");
//                     document.getElementById(counter[1]).setAttribute("class","memory-card");
//                     a = 0;
//                 }

//                 document.getElementById(j).setAttribute("class","card-selected")
                
//                 if(j !== counter[a-1]){
//                     counter[a] = j;
//                     a++;

//                     if(a === 2){
//                         if(document.getElementById(counter[0]).innerHTML === document.getElementById(counter[1]).innerHTML){
//                             document.getElementById(counter[0]).setAttribute("class","card-guessed");
//                             document.getElementById(counter[1]).setAttribute("class","card-guessed");
//                             divArray.item[counter[0]] = null;
//                             divArray.item[counter[1]] = null;
//                             document.getElementById("msg-box").innerHTML = "DONE!!!";
//                             a = 0;
//                         }else{
//                             document.getElementById("msg-box").innerHTML = "RETRY!!!";               
//                         }
//                     }
//                 }
//             }else{
//                 document.getElementById("msg-box").innerHTML = "YOU WIN!!!";
//             }
//         })
//     }
// }

// function startTimer(){
//     let TIME = 60;
//     let myTimer = setInterval(() => {
//         document.getElementById("timer-div").innerHTML = TIME;
//         TIME--;
//         if(TIME === -1){
//             clearInterval(myTimer);
//             clearDisplay();
//             start()
//         }
//     },1000)
// }

// function clearDisplay(){
//     document.getElementById("gameDiv").innerHTML = " ";
// }

// function connect() {
//     let myRequest = new XMLHttpRequest();
//     myRequest.open("GET", "https://zoo-animal-api.herokuapp.com/animals/rand/8",false);
//     myRequest.send("null")

//     let rawData = myRequest.responseText;
//     let data = JSON.parse(rawData);
//     console.log(data)

//     return(data)
// }

export default MemoryGame;