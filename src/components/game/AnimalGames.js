import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/gameAnimal.css"

const AnimalGames = () => {
    
    return(
        <div>
            <div id="Games">
                <h1>Animal Games</h1>
            </div>
            <div className="row row-cols-1 row-cols-md-4 g-4" id="GamesCardGroup">
                {youtube()}
                {quiz()}
                {impiccato()}
                {memory()}
            </div>
        </div>
    );
}

function youtube(){
    return(
        <div className='col'>
            <div className="card border-dark mb-3">
            <img 
                    src="https://th.bing.com/th/id/OIP.nbOuDweU9xZoI3gcqCEBWwHaHa?pid=ImgDet&rs=1" 
                    className="card-img-top" 
                    alt="YoutubeLogo"
                    id="ytCardLogo">
                </img>
                <div className="card-body">
                    <h5 className="card-title">Youtube</h5>
                    <p className="card-text">Youtube funny animal videos</p>
                    <a 
                        href="/youtubeVideos" 
                        className="btn btn-outline-primary fs-5">
                        Open
                    </a>
                </div>
            </div>
        </div>
    );
}

function quiz(){
    return(
        <div className='col'>
            <div className="card border-dark mb-3">
            <img 
                    src="https://th.bing.com/th/id/OIP.nbOuDweU9xZoI3gcqCEBWwHaHa?pid=ImgDet&rs=1" 
                    className="card-img-top" 
                    alt="YoutubeLogo"
                    id="ytCardLogo">
                </img>
                <div className="card-body">
                    <h5 className="card-title">Quiz</h5>
                    <p className="card-text">Trivia animal quiz</p>
                    <a 
                        href="/gamePage/quiz" 
                        className="btn btn-outline-primary fs-5">
                        Open
                    </a>
                </div>
            </div>
        </div>
    );
}

function impiccato(){
    return(
        <div className='col'>
            <div className="card border-dark mb-3">
            <img 
                    src="https://th.bing.com/th/id/OIP.nbOuDweU9xZoI3gcqCEBWwHaHa?pid=ImgDet&rs=1" 
                    className="card-img-top" 
                    alt="YoutubeLogo"
                    id="ytCardLogo">
                </img>
                <div className="card-body">
                    <h5 className="card-title">Impiccato</h5>
                    <p className="card-text">Indovina la parola...</p>
                    <a 
                        href="/gamePage/hangman" 
                        className="btn btn-outline-primary fs-5">
                        Open
                    </a>
                </div>
            </div>
        </div>
    );
}

function memory(){
    return(
        <div className='col'>
            <div className="card border-dark mb-3">
            <img 
                    src="https://th.bing.com/th/id/OIP.nbOuDweU9xZoI3gcqCEBWwHaHa?pid=ImgDet&rs=1" 
                    className="card-img-top" 
                    alt="YoutubeLogo"
                    id="ytCardLogo">
                </img>
                <div className="card-body">
                    <h5 className="card-title">Memory</h5>
                    <p className="card-text">Scova le coppie!</p>
                    <a 
                        href="/memory" 
                        className="btn btn-outline-primary fs-5">
                        Open
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AnimalGames;