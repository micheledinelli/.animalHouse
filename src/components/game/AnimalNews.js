import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/animalNews.css'
import NewsImage from '../../assets/undraw_my_feed_inj0.png';

const AnimalNews = () => {
    let newsArray = connect();
    let cardList = 
        newsArray
        .slice(0,10)
        .sort((a,b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
        .map((element) =>
            <div className="card" key={element.url} id="newsCard">
                <div className="card-body" id="newsBody">
                    <h5 className="card-title">{element.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{formatDate(element.publishedAt)}</h6>
                    <p className="card-text">{element.content}</p>
                    <a 
                        href={element.url} 
                        className="btn btn-outline-primary fs-5">
                            Read full article
                    </a>
                </div>
                <div className="img-class" id="newsImgDiv">
                    <img 
                        src={element.urlToImage} 
                        id="newsImg"
                        className="card-img-right img-fluid rounded float-end animal-news-img" 
                        alt="...">
                    </img>
                </div>
            </div>);

    return(
        <div id="News" className="container">
            {/* <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
            <h1 className="mb-3">Latest news</h1>
            <div className="d-flex flex-column flex-wrap">
                {cardList}
            </div>
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