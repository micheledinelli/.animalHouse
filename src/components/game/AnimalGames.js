import 'bootstrap/dist/css/bootstrap.min.css';

const AnimalGames = () => {
    
    return(
        <div>
            <div className='container text-center my-5' id="Games">
                <h1>Animal Games</h1>
            </div>
            <div className="container my-5 d-flex justify-content-evenly align-items-center" >
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
        
        <div className="card border-dark shadow-lg mb-3">
            {/* <img 
                src="https://th.bing.com/th/id/OIP.nbOuDweU9xZoI3gcqCEBWwHaHa?pid=ImgDet&rs=1" 
                className="card-img-top" 
                alt="YoutubeLogo"
                id="ytCardLogo">
            </img> */}
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
        
    );
}

function quiz(){
    return(
            <div className="card border-dark shadow-lg mb-3">
                {/* <img 
                    src="https://th.bing.com/th/id/OIP.nbOuDweU9xZoI3gcqCEBWwHaHa?pid=ImgDet&rs=1" 
                    className="card-img-top" 
                    alt="YoutubeLogo"
                    id="ytCardLogo">
                </img> */}
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
        
    );
}

function impiccato(){
    return(
            <div className="card border-dark shadow-lg mb-3">
                {/* <img 
                    src="https://th.bing.com/th/id/OIP.nbOuDweU9xZoI3gcqCEBWwHaHa?pid=ImgDet&rs=1" 
                    className="card-img-top" 
                    alt="YoutubeLogo"
                    id="ytCardLogo">
                </img> */}
                <div className="card-body">
                    <h5 className="card-title">Hangman</h5>
                    <p className="card-text">Guess or...</p>
                    <a 
                        href="/gamePage/hangman" 
                        className="btn btn-outline-primary fs-5">
                        Open
                    </a>
                </div>
            </div>
    );
}

function memory(){
    return(
        <div className="card border-dark shadow-lg mb-3">
            {/* <img 
                src="https://th.bing.com/th/id/OIP.nbOuDweU9xZoI3gcqCEBWwHaHa?pid=ImgDet&rs=1" 
                className="card-img-top" 
                alt="YoutubeLogo"
                id="ytCardLogo">
            </img> */}
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
    );
}

export default AnimalGames;