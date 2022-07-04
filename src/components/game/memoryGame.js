import React from "react"

const MemoryGame = () => {
    return(
        <div>
            <h1>Memory Game!!!</h1>
            {/* <div style="column-count: 4;"> */}
                {connect()}
            {/* </div> */}
        </div>
        
    )
}

function connect(){
    let myRequest = new XMLHttpRequest();
    myRequest.open("GET","https://zoo-animal-api.herokuapp.com/animals/rand/8",false);
    myRequest.send("null");

    console.log(JSON.parse(myRequest.responseText));
    return(showimg(JSON.parse(myRequest.responseText)));
}

function showimg(data){
    let elementArray = [];
    for(let i=0; i<data.length; i++){
        let tmp = data[i].image_link;
        elementArray[i] = tmp;
    }

    let print = elementArray.map((element) => <img src={element} key={element}></img>)

    return(print)
}

export default MemoryGame;