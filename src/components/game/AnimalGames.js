import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/gameAnimal.css"

const AnimalGames = () => {
    
    return(
        <div className='card-group' id="Games">
            {youtube()}
            {game1()}
            {game2()}
        </div>
        
    );
}

function youtube(){
    return(
        <div className="card">
            <img src="https://th.bing.com/th/id/OIP.nbOuDweU9xZoI3gcqCEBWwHaHa?pid=ImgDet&rs=1" className="card-img-top" alt="YoutubeLogo"></img>
            <div className="card-body">
                <h5 className="card-title">Youtube</h5>
                <p className="card-text">Youtube funny animal videos</p>
            </div>
            <a 
                href="/youtubeVideos" 
                className="btn btn-outline-primary fs-5">
                    Open
            </a>
        </div>
    );
}

function game1(){
    return(
        <div className="card">
            <img src="https://th.bing.com/th/id/OIP.nbOuDweU9xZoI3gcqCEBWwHaHa?pid=ImgDet&rs=1" className="card-img-top" alt="..."></img>
            <div className="card-body">
                <h5 className="card-title">Youtube</h5>
                <p className="card-text">Youtube funny animal videos</p>
            </div>
            <a 
                href="youtubeVideos.js" 
                className="btn btn-outline-primary fs-5">
                    Open
            </a>
        </div>
    );
}

function game2(){
    return(
        <div className="card">
            <img src="https://th.bing.com/th/id/OIP.nbOuDweU9xZoI3gcqCEBWwHaHa?pid=ImgDet&rs=1" className="card-img-top" alt="..."></img>
            <div className="card-body">
                <h5 className="card-title">Youtube</h5>
                <p className="card-text">Youtube funny animal videos</p>
            </div>
            <a 
                href="youtubeVideos.js" 
                className="btn btn-outline-primary fs-5">
                    Open
            </a>
        </div>
    );
}

export default AnimalGames;