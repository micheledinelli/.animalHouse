import React, { useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import GameNavbar from "./GameNavbar";

const Youtube = () => {
    let videoList = connect();
    
    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);

        if(searchInput !== '') {
            const filteredData = videoList.filter((item) => {
                return Object.values(item.snippet.title).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(videoList);
        }
    }

    if(videoList == "error"){
        return(
            <div>
                <GameNavbar />
                <h1>ERROR</h1>
            </div>
        )
    }
    videoList = videoList.items;
    let ytLink = "https://www.youtube.com/watch?v=";

    return(
        <div>
            <GameNavbar />
            <div id="youtubeBody" className="container">
                <p className="fs-1 fw-bold" id="youtubeTitle">Funny Youtube Videos</p>
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
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {
                        searchInput.length > 1 ?
                            filteredResults.map((element) => (
                            <div className="col" key={element.id.videoId}>
                                <div className="card border-3 mb-3" id="youtubeCard">
                                    <img src={element.snippet.thumbnails.high.url} className="card-img-top" alt="..."></img>
                                    <div className="card-body">
                                        <h5 className="card-title">{element.snippet.title}</h5>
                                        <p className="card-text">{element.snippet.channelTitle}</p>
                                        <a href={ytLink + element.id.videoId} className="btn btn-outline-primary">Watch Video</a>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-muted">{formatDate(element.snippet.publishedAt)}</small>
                                    </div>
                                </div>
                            </div>
                            )) : 
                            videoList.map((element) => (
                            <div className="col" key={element.id.videoId}>
                                <div className="card mb-3 border-3" id="youtubeCard">
                                    <img src={element.snippet.thumbnails.high.url} className="card-img-top" alt="..."></img>
                                    <div className="card-body">
                                        <h5 className="card-title">{element.snippet.title}</h5>
                                        <p className="card-text">{element.snippet.channelTitle}</p>
                                        <a href={ytLink + element.id.videoId} className="btn btn-outline-primary">Watch Video</a>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-muted">{formatDate(element.snippet.publishedAt)}</small>
                                    </div>
                                </div>
                            </div>
                            ))
                        }
                </div>
            </div>
        </div>
    )
}

function connect(){
    //API_KEY => AIzaSyC11EwTLWAtkam-iQP7tZ-zw-9HVAoeiKs
    let myRequest = new XMLHttpRequest();
    myRequest.open("GET", "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=funny%20animals&maxResults=48&key=AIzaSyC11EwTLWAtkam-iQP7tZ-zw-9HVAoeiKs", false);
    myRequest.send("null");

    if(myRequest.status == 200){
        let response = myRequest.responseText; 
        response = JSON.parse(response);

        return(
            {response}.response
        )
    }else{
        return("error")
    }
}

function formatDate(rawDate){
    let dataMillisec = Date.parse(rawDate);
    let dataFormattata = new Date(dataMillisec).toUTCString();

    return(
        dataFormattata
    )
}

export default Youtube;