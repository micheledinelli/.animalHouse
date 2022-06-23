import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const AnimalNews = () => {
    let newsArray = connect();
    return(
        // <div>
        //     {newsArray}
        // </div>
        null
    )
}

function connect(){
    let myConnection = new XMLHttpRequest();
    myConnection.open("GET", "https://virtserver.swaggerhub.com/whiterabbit8/meowfacts/1.0.0/", false);
    myConnection.send("null");
    let response = myConnection.responseText;

    console.log(showNews(response.data))
    return(
        showNews(response)
    )
}

function showNews(rawData){
    let data = (JSON.parse(rawData))["data"];
    console.log(data)

    return(
        {data}
    )
}

export default AnimalNews;