import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import NavbarBackOffice from "./NavbarBackOffice";

const WallManager = () => {

    const [messagesData, setMessagesData] = useState();
    const [badLanguageMessages, setBadLanguageMessages] = useState();
    const [bannedWords] = useState(["okok prova", "animalHouse"]);

    useEffect(() => {
        getWallMessages();
    }, [])

    const getWallMessages = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/wall");
            if(response.status == 200) {
                setMessagesData(response.data);
            }
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Conncetion refused");
            }         
        }
    }

    const lookupBadLanguage = () => {

        let matches = 0;
        let badLanguageArr = [];

        for(let i = 0; i < messagesData.length; i++) {

            let comments = messagesData[i].comments;

            for(let j = 0; j < comments.length; j++) {
                let isBad = false;
                for(let k = 0; k < bannedWords.length; k++) {
                    let regexp = new RegExp('.*' + bannedWords[k] + '.*', 'i');
                    if( regexp.exec(comments[j].text) ) {
                        matches += 1;
                        isBad = true;
                    }
                    
                    if(isBad) {
                        badLanguageArr.push({comment: comments[j], wallMessage: messagesData[i]});
                    }
                }
            }

        }

        setBadLanguageMessages(badLanguageArr);

        const NotificationOfMatches = () => {
            return(
                <button 
                    className="btn btn-outline-success mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#bad-language-modal"
                >
                    Found {matches} matches: Show
                </button>
            )
        }
        matches > 0 ? 
            toast.info(<NotificationOfMatches />, {
                position: toast.POSITION.BOTTOM_CENTER
            }) : 
            toast.error("No matches found", {
                position: toast.POSITION.BOTTOM_CENTER
            })
        
    }

    const handleDelete = async (wallId) => {

        try {
            const response = await axios.delete(`http://localhost:8080/api/wall/${wallId}`);
            toast.success(response.data.message);
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            }  
        }

        const clonedArr = messagesData.slice();
        const newArr = clonedArr.filter((item) => item._id !== wallId);
        setMessagesData(newArr);

    }

    const AccordionComments = (props) => {

        if(props.comments.length > 0) {
            let id = "id-" + props.id;
            return(
                <div className="accordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#"+id} aria-expanded="true" aria-controls="collapseOne">
                            Show comments
                        </button>
                        </h2>
                        <div id={id} className="accordion-collapse collapse hide" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                {
                                    props.comments.map((e, index) => (
                                        <p className="lead" key={index}>
                                            <b>{e.author}</b> says: {e.text}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )

        } else {
            return <p className="lead">No comments on this post</p>
        }

    }

    const WallMessage = (props) => {
        return(
            <div className="card shadow-sm postion-relative p-3">
                <div className="top-0 start-100">
                    <button className="btn btn-outline-danger" onClick={(e) => handleDelete(props.element._id)}>
                        <i className="bi bi-trash3"></i>
                    </button>
                </div>
                <div className="card-body">
                    <p className="lead">
                        Written by: <b>{props.element.author}</b> on <span className="text-small"> {props.element.date.slice(0,10)}</span>
                    </p>
                    <p className="lead display-6">{props.element.title}</p>
                    <p className="lead">{props.element.body}</p>
                    <AccordionComments key={props.element._id} id={props.index} comments={props.element.comments}/>
                </div>
            </div>
        )
    }

    return(
        <>
            <NavbarBackOffice />
            <div className="container my-3">    
                <div className="d-flex my-3">
                    <button className="btn btn-outline-secondary me-3" onClick={lookupBadLanguage}>look up for bad language</button>
                    <button 
                        className="btn btn-outline-secondary mx-3" 
                        data-bs-toggle="modal"
                        data-bs-target="#banned-words-modal"
                    >
                        Show banned words
                    </button>
                </div>
                <p className="display-4">Latest wall messages</p>
                <div className="row">
                {
                    messagesData && 
                        messagesData
                            .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
                            .slice(0, 10)
                            .map((e, index) => (
                                <div key={e._id} className="col-lg-4 my-2">
                                    <WallMessage index={index} element={e} />
                                </div>
                            ))
                }
                </div>
                <ToastContainer />
            </div>
            {/* Bad language modal */}
            <div className="modal fade" id="bad-language-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Matches</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                badLanguageMessages && badLanguageMessages.map((e, index) => (
                                    <div className="text-center bg-light border-3 p-2 mb-2 position-relative" key={index}>
                                        <div className="position-absolute top-0 start-90">
                                            <button className="btn btn-outline-danger" onClick={(event) => handleDelete(e.wallMessage._id)}>
                                                <i className="bi bi-trash3"></i>
                                            </button>
                                        </div>
                                        <p className="lead">
                                            Author: {e.wallMessage.author}
                                        </p>
                                        <p className="lead">
                                            Comment in crime: <b className="text-danger">{e.comment.text} </b>
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* Bannerd words */}
            <div className="modal fade" id="banned-words-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Banned words</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                bannedWords && bannedWords.map((e, index) => (
                                    <div className="text-center bg-light border-3 p-2 mb-2" key={index}>
                                        <p className="lead">
                                           {e}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WallManager;