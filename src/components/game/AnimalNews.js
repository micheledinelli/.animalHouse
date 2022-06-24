import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/animalNews.css'

const AnimalNews = () => {
    let newsArray = connect();

    let cardList = newsArray.map((element) =>
    <div className="card" key={element.url}>
        <div className="card-body">
            <h5 className="card-title">{element.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{formatDate(element.publishedAt)}</h6>
            <p className="card-text">{element.content}</p>
            <a 
                href={element.url} 
                className="btn btn-outline-primary fs-5">
                    Read full article
            </a>
        </div>
        <div className="img-class">
            <img 
                src={element.urlToImage} 
                className="card-img-right rounded float-end" 
                alt="...">
            </img>
        </div>
    </div>);

    return(
        <div id="News">
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <h1>Animal News</h1>
            {cardList}
        </div>
    )
}

function connect(){
    //API_KEY -> 2c965b0e26694da49d9b0ecbdbb41348
    let myConnection = new XMLHttpRequest();
    myConnection.open("GET", "https://newsapi.org/v2/everything?q=animal&apiKey=2c965b0e26694da49d9b0ecbdbb41348", false);
    myConnection.send("null");
    let response = myConnection.responseText;

    return(
        showNews(response).data
    )
}

function showNews(rawData){
    let data = (JSON.parse(rawData))["articles"];

    return(
        {data}
    )
}

function formatDate(rawDate){
    let dataMillisec = Date.parse(rawDate);
    let dataFormattata = new Date(dataMillisec).toUTCString();

    return(
        dataFormattata
    )
}

export default AnimalNews;