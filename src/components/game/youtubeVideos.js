import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/youtube.css"
import GameNavbar from "./GameNavbar";

const Youtube = () => {
    return(
        <div>
            <div>
                <GameNavbar />
            </div>
            <form className="d-flex" role="search">
                <input 
                    className="form-control me-2" 
                    type="search" placeholder="Search" 
                    aria-label="Search" 
                    id="serachToVideo">
                </input>
                <button 
                    className="btn btn-outline-success" 
                    type="submit" 
                    id="submitSearchVideo"
                    // onClick={searchClicked()}
                    >
                    Search
                </button>
            </form>
            <div id="youtubeBody">
                <p className="fs-1 fw-bold" id="youtubeTitle">Funny Youtube Videos</p>
                {setup("funny%20animals")}
                {/* <div id="div-videos"></div> */}
                {/* <div className="row row-cols-1 row-cols-md-3 g-4" id="div-videos"></div> */}
            </div>
            <script src="/youtubeScript.js"></script>
        </div>
    )
}



// function start(){

    function searchClicked(){
    // document.getElementById("submitSearchVideo").addEventListener("click", () => {
        let myIn = document.getElementById("searchToVideo");
        if(myIn){
            let search = myIn.value;

            if(search){
                setup(adaptString(search))
            }else{
                setup("funny%20animals")
            }
        }else{
            setup("funny%20animals")
        }
    }
    // )

    function setup(searchString) {
        let myDiv = document.getElementById("div-videos");
        
        if(myDiv){
            myDiv.innerHTML = '';
            myDiv.appendChild(showVideos(searchString));
        }else{
            let myDiv = document.createElement("div");
            myDiv.setAttribute("id","div-videos")
            myDiv.appendChild(showVideos(searchString));
            return(myDiv)
        }
    }

    function showVideos(searchString) {
        let rawData = connect(searchString).response;
        let data = JSON.parse(rawData).items;
        let ytLink = "https://www.youtube.com/watch?v=";
    
        //da rifare con Cards
        let myContainer = document.createElement("div");
        myContainer.className = "row row-cols-1 row-cols-md-3 g-4";
        for(let i=0; i<data.length; i++){
            
            let div1 = document.createElement("div");
            div1.className = "col";
            
            //card container
            let div2 = document.createElement("div");
            div2.className = "card border-dark mb-3";
            div2.setAttribute("id", "youtubeCard");

            //card body
            let div3 = document.createElement("div");
            div3.className = "card-body";

            //card footer
            let div4 = document.createElement("div");
            div4.className = "card-footer";

            //top image
            let img = document.createElement("img");
            img.className = "card-img-top";
            img.setAttribute("src", data[i].snippet.thumbnails.high.url);
            img.setAttribute("alt", "...");

            //card title
            let h5 = document.createElement("h5");
            h5.className = "card-title";
            h5.innerText = data[i].snippet.title;

            //card text
            let p = document.createElement("p");
            p.className = "card-text";
            p.innerText = data[i].snippet.channelTitle;

            //card button
            let a = document.createElement("a");
            a.className = "btn btn-outline-primary";
            a.setAttribute("href", ytLink + data[i].id.vidoId);

            //card footer
            let small = document.createElement("small");
            small.className = "text-muted";
            small.innerText = formatDate(data[i].snippet.publishedAt);

            div3.appendChild(h5);
            div3.appendChild(p);
            div3.appendChild(a);
            div4.appendChild(small);
            div2.appendChild(img);
            div2.appendChild(div3);
            div2.appendChild(div4);
            div1.appendChild(div2);
            myContainer.appendChild(div1);
        }

        return(myContainer)
    }

    function connect(searchString) {
        //API_KEY -> AIzaSyC11EwTLWAtkam-iQP7tZ-zw-9HVAoeiKs
        let myLink = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" + searchString + "&maxResults=48&key=AIzaSyC11EwTLWAtkam-iQP7tZ-zw-9HVAoeiKs";
        console.log(myLink);
        let myConnection = new XMLHttpRequest();
        myConnection.open("GET", myLink, false);
        myConnection.send("null");
        console.log(myConnection.status)
        let response = myConnection.responseText;
        return({response})
    }

    function formatDate(rawDate){
        let dataMillisec = Date.parse(rawDate);
        let dataFormattata = new Date(dataMillisec).toUTCString();
    
        return(
            dataFormattata
        )
    }
    
    function adaptString(rawString){
        let finalString = "";
        return(finalString)
    }
// }

export default Youtube