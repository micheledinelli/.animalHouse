import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/youtube.css"
import GameNavbar from "./GameNavbar";

const Youtube = () => {
    let videoList = connect();
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

    let cardList = videoList.map((element) =>
    <div className="col" key={element.id.videoId}>
        <div className="card border-dark mb-3" id="youtubeCard">
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
    </div>);

    return(
        <div>
            <div>
                <GameNavbar />
            </div>
            <div id="youtubeBody">
                <p className="fs-1 fw-bold" id="youtubeTitle">Funny Youtube Videos</p>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {cardList}
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
        console.log(response)
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