import 'bootstrap/dist/css/bootstrap.min.css';

const AnimalGames = () => {
    
    return(
        <div className='container'>
            <div className='container text-center my-5' id="Games">
                <h1>Animal Games</h1>
            </div>
            <div className="row my-5">
                <div className='col-lg-3'>
                    {youtube()}
                </div>
                <div className='col-lg-3'>
                    {quiz()}
                </div>
                <div className='col-lg-3'>
                    {impiccato()}
                </div>
                <div className='col-lg-3'>
                    {memory()}
                </div>
            </div>
        </div>
    );
}

function youtube(){

    return(
        <div className="card border-dark shadow-lg mb-3">
            <div className="card-body">
                <div>
                    <h5 className="card-title">Youtube</h5>
                    <p className="card-text">Funny animal videos</p>
                    <a 
                        href="/youtubeVideos" 
                        className="btn btn-outline-danger fs-5"
                    >                       
                    <i className="bi bi-youtube mx-3"></i>
                        Open
                    </a>
                </div>
            </div>
        </div>
    );
}

function quiz(){
    return(
        <div className="card border-dark shadow-lg mb-3">
            <div className="card-body">
                <div>
                    <h5 className="card-title">Quiz</h5>
                    <p className="card-text">Animal Quiz game</p>
                    <a 
                        href="gamePage/quiz" 
                        className="btn btn-outline-primary fs-5"
                    >                       
                    <i className='bi bi-question-circle mx-3'></i>
                    Open
                    </a>
                </div>
            </div>
        </div>
    );
}

function impiccato(){
    return(
        <div className="card border-dark shadow-lg mb-3">
            <div className="card-body">
                <div>
                    <h5 className="card-title">Hangman</h5>
                    <p className="card-text">Hangman game</p>
                    <a 
                        href="gamePage/hangman" 
                        className="btn btn-outline-secondary fs-5"
                    >                       
                    <i className="bi bi-emoji-dizzy-fill mx-3"></i>
                    Open
                    </a>
                </div>
            </div>
        </div>
    );
}

function memory(){
    return(
        <div className="card border-dark shadow-lg mb-3">
            <div className="card-body">
                <div>
                    <h5 className="card-title">Memory</h5>
                    <p className="card-text">Memory game</p>
                    <a 
                        href="gamePage/memory" 
                        className="btn btn-outline-ligth border fs-5"
                    >                       
                    <i className="bi bi-app mx-3"></i>
                    Open
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AnimalGames;