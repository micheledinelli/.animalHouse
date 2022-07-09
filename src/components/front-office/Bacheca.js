import React, { useEffect, useState } from "react";
import NavigationFrontOffice from "./NavigationFrontOffice";
import NavbarFrontOffice from "./NavbarFrontOffice";
import axios from "axios";

const Bacheca = () => {

    const [messagesData, setMessagesData] = useState();

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    useEffect(() => {
        getWallMessages();
    })

    const getWallMessages = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/wall");
            if(response.status == 200) {
                setMessagesData(response.data);
            }
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
            
            } else {
            }         
        }
    }

    const AccordionComments = (props) => {
        if(props.comments.length > 0) {
            let id = "id-" + props.id;
            console.log(props.id);
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
                                    props.comments.map((e) => (
                                        <p className="lead" key={e.author}>
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


    const WallCard = (props) => {
       
            const base64S =  props.element.image ? arrayBufferToBase64(props.element.image.data.data) : null 
            if (base64S){
                return (
                    <div className="card shadow-sm postion-relative p-3">
                        <div className="card-body">
                            <p className="lead">
                                Written by: <b>{props.element.author}</b> on <b>{props.element.date}</b>
                            </p>
                            <p className="lead display-6">{props.element.title}</p>
                            <p className="lead">{props.element.body}</p>
                            {
                                base64S && <img src={`data:image/png;base64,${base64S}`}></img>
                            }
                        </div>
                    </div>
                )
            }else{
                return(
                    // <div className="card shadow-sm postion-relative p-3">
                    //     <div className="card-body">
                    //         <p className="lead">
                    //             Written by: <b>{props.element.author}</b> on <b>{props.element.date}</b>
                    //         </p>
                    //         <p className="lead display-6">{props.element.title}</p>
                    //         <p className="lead">{props.element.body}</p>
                    //     </div>
                    // </div>

                    <div className="container text-center ">
                        <div className="card" >
                            <div className="card-body">
                                <h5 className="card-title">{props.element.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{props.element.author}</h6>
                                <p className="card-text">{props.element.body}</p>
                                <AccordionComments key={props.element._id} id={props.index} comments={props.element.comments}/>

                            </div>
                        </div>
                    </div>
                )
            }
       
        }
    return(
        <div>
            <div className="container text-center"> 
                <div className="row">
                {
                messagesData && 
                    messagesData.map((elem) => {
                            return (
                                <div className="col-lg-12 col-sm-12" >
                                    <WallCard element={elem} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Bacheca;