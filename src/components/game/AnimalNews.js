import React, { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

const AnimalNews = () => {
    let newsArray = connect();

    const [searchExp, setSearchExp] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    const imageStyle = {
        width: "100%",
        height: "100%",
        objectFit: "contain",
    }
    
    const imageContainerStyle = {
        width: "30%",
        height: "100%"
    }

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);

        if(searchInput !== '') {
            const filteredData = newsArray.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(newsArray);
        }

    }
    
    return(
        <div id="News" className="container">
            <h1 className="mb-3">Latest news</h1>
            <form className="d-flex my-3" role="search" onSubmit={(e) => e.preventDefault()}>
                <input 
                    className="form-control me-2" 
                    type="search" 
                    placeholder="Search" 
                    aria-label="Search"
                    onChange={(e) => searchItems(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <div className="d-flex flex-column flex-wrap">
                {
                    searchInput.length > 1 ? 
                        filteredResults.map((element) => (
                            <div className="card my-1 border-3 shadow-sm" key={element.url}>
                                <div className="card-body">
                                    <div className="float-end ms-5" style={imageContainerStyle}>
                                        <img src={element.urlToImage} style={imageStyle}></img>
                                    </div>
                                    <h5 className="card-title">{element.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{formatDate(element.publishedAt)}</h6>
                                    <p className="card-text">{element.content}</p>
                                    <a 
                                        href={element.url} 
                                        className="btn btn-outline-primary fs-5">
                                            Read full article
                                    </a>
                                </div>
                            </div>
                        )) : 
                        newsArray
                            .slice(0,10)
                            .sort((a,b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
                            .map((element) => (
                                <div className="card my-1 border-3 shadow-sm" key={element.url}>
                                    <div className="card-body">
                                        <div className="float-end ms-5" style={imageContainerStyle}>
                                            <img src={element.urlToImage} style={imageStyle}></img>
                                        </div>
                                        <h5 className="card-title">{element.title}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{formatDate(element.publishedAt)}</h6>
                                        <p className="card-text">{element.content}</p>
                                        <a 
                                            href={element.url} 
                                            className="btn btn-outline-primary fs-5">
                                                Read full article
                                        </a>
                                    </div>
                                </div>
                            ))
                }
               
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