import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import NavbarBackOffice from "./NavbarBackOffice";
import FormData from 'form-data';
import {Buffer} from 'buffer';
import TmpSchemaForImages from "../front-office/TmpSchemaForImages.js"

const WallManager = () => {

    const [messagesData, setMessagesData] = useState();

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
                        Written by: <b>{props.element.author}</b> on <b>{props.element.date}</b>
                    </p>
                    <p className="lead display-6">{props.element.title}</p>
                    <p className="lead">{props.element.body}</p>
                    {
                        props.element.image?.data.data && <p>image</p>
                    }
                    <AccordionComments key={props.element._id} id={props.index} comments={props.element.comments}/>
                </div>
            </div>
        )
    }

    return(
        <>
            <NavbarBackOffice />
            <div className="container">
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
                <TmpSchemaForImages />
            </div>
        </>
    )
}

export default WallManager;