import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Feed from "../../assets/undraw_my_feed_inj0.png";

const Bacheca = () => {

    const [messagesData, setMessagesData] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [newPostForm, setNewPostForm] = useState({
        title: "",
        body: "",
        category: "",
        comment: ""
    })

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

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
            
            } else {
            }         
        }
    }

    const handleChange = ({target: input}) => {
        setNewPostForm({...newPostForm, [input.name]: input.value});
    }

    const handleSubmitNewPost = async (e) => {
        e.preventDefault();
        let data = new FormData();
        data.set('photo', selectedImage);
        data.set("author", window.localStorage.getItem('user_email'));
        data.set("title", newPostForm.title);
        data.set("body", newPostForm.body);
        data.set("category", newPostForm.category);
        try {
            axios.post("http://localhost:8080/api/wall/posts", data, {
                headers: {
                  'accept': 'application/json',
                  'Accept-Language': 'en-US,en;q=0.8',
                  'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            })
            .then((response) => {
                toast.success(response.data.message);
                getWallMessages();
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const AccordionComments = (props) => {
        if(props.comments.length > 0) {
            let id = "id-" + props.id;
            return(
                <div className="accordion mt-3">
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
                                        <p className="lead text-small text-muted text-start " key={e.author + Math.random()}>
                                            <b>{e.author}</b> says: {e.text}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const handleCommentSubmit = async (commentId, wallId) => { 
        try {
            if(document.getElementById(commentId)){    
                let commentVal = document.getElementById(commentId).value;

                let body = {
                    author: window.localStorage.getItem("user_email"),
                    comment: commentVal
                }

                const response = await axios.post(`http://localhost:8080/api/wall/${wallId}`, body);
                if(response.status == 201) {
                    toast.success(response.data.message);
                    getWallMessages();
                }
            }
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Conncetion refused");
            }
        }
    }

    const Comment = (props) => {
        return(
            <form onSubmit={(e) => {
                e.preventDefault();
                handleCommentSubmit(props.id, props.wallId);
            }}>
                <div className="input-group mt-3">
                    <input type="text" className="form-control" id={props.id} />
                    <button className="btn btn-outline-primary" type="submit">
                        <i className="bi bi-pen"></i>
                    </button>
                </div>
            </form>
        )
    }

    const WallCard = (props) => { 
        const base64S =  props.element.image ? arrayBufferToBase64(props.element.image.data.data) : null 
        if (base64S){
            return (
                <div className="container text-center mb-3 ">
                    <div className="card shadow-sm border-3 postion-relative p-3">
                        <div className="card-body">
                            {
                                props.element.category && 
                                <div className="text-start">
                                    <p className="text-muted text-small text-start">Category: {props.element.category}</p>
                                </div> 
                            }
                            <h5 className="card-title">{props.element.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{props.element.author}</h6>
                            <p className="card-text">{props.element.body}</p>
                            <div style={{width:"100%"}}>
                                {
                                    base64S && 
                                        <img 
                                            src={`data:image/png;base64,${base64S}`}
                                            style={{height:"10rem", width:"100%", objectFit:"contain"}}
                                            className="img-fluid rounded"
                                            >
                                        </img>
                                }
                            </div>
                            <AccordionComments key={props.element._id} id={props.index} comments={props.element.comments}/>
                            <Comment id={props.index} wallId={props.element._id}/>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="container text-center mb-3">
                    <div className="card shadow-sm border-3">
                        <div className="card-body">
                            {
                                props.element.category && 
                                <div className="text-start">
                                    <p className="text-muted text-small text-start">Category: {props.element.category}</p>
                                </div> 
                            }
                            <h5 className="card-title">{props.element.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{props.element.author}</h6>
                            <p className="card-text">{props.element.body}</p>
                            <AccordionComments key={props.element._id} id={props.index} comments={props.element.comments}/>
                            <Comment />
                        </div>
                    </div>
                </div>
            )
        }
    
    }

    return(
        <div className="position-relative">
            <ToastContainer />
            <button 
                className="mx-5 my-5 btn btn-primary btn-lg text-white rounded-circle position-fixed bottom-0 end-0"
                style={{zIndex: "999"}}
                data-bs-toggle="modal"
                data-bs-target="#post-message-modal"
            >
                <i className="bi bi-pencil-square"></i>
            </button>
            <div className="container text-center"> 
                <p className="lead display-4">Wall Messages</p>
                <div className="row">
                    <div className="col-lg-5">
                       <div className="sticky-top">
                            <img 
                                className="img-fluid"
                                src={Feed}
                            >
                            </img>
                            <a className="btn btn-primary btn-lg mx-3" href="/frontOffice">
                                <i className="bi bi-arrow-left text-white"></i>
                            </a>
                            <a className="btn btn-primary btn-lg mx-3" href="/">
                                <i className="bi bi-house text-white"></i>
                            </a>
                            <a className="btn btn-primary btn-lg mx-3" href="/user">
                                <i className="bi bi-person text-white"></i>
                            </a>
                       </div>
                    </div>
                    <div className="col-lg-7 mt-5">
                        {
                            messagesData && 
                                messagesData
                                    .sort((a,b) => Date.parse(b.date) - Date.parse(a.date))
                                    .map((elem, index) => {
                                        return (
                                            <div className="col-lg-12 col-sm-12" key={index}>
                                                <WallCard element={elem} index={index}/>
                                            </div>
                                        )
                            })
                        }

                        {
                            !messagesData && 
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                        }
                    </div>
                </div>
            </div>
            {/* New post modal */}
            <div className="modal fade" id="post-message-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmitNewPost} className="text-center">
                                <div className="form-floating mb-3">
                                    <input 
                                        type="text" 
                                        name="title"
                                        className="form-control" 
                                        onChange={handleChange}
                                        placeholder="title"
                                        required
                                    />
                                    <label htmlFor="title">title</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <textarea 
                                        type="text" 
                                        name="body"
                                        style={{height:"150px"}}
                                        className="form-control" 
                                        onChange={handleChange}
                                        placeholder="title"
                                        required
                                    />
                                    <label htmlFor="title">body</label>
                                </div>
                                <select 
                                    name="category"
                                    className="form-select mb-3" 
                                    onChange={handleChange}
                                    required
                                >
                                    <option>Choose category</option>
                                    <option value="Food">Food</option>
                                    <option value="Walks">Walks</option>
                                    <option value="Parks">Parks</option>
                                    <option value="Stores">Stores</option>
                                    <option value="Sitter">Sitter</option>
                                </select>
                                <input 
                                    type="file" 
                                    name="image"
                                    className="form-control" 
                                    onChange={(event) => {
                                        setSelectedImage(event.target.files[0]);
                                    }}
                                    placeholder="image"
                                />
                                
                                {selectedImage && (
                                    <div className="my-3">
                                        <img alt="not fount" width={"250px"} src={window.URL.createObjectURL(selectedImage)} />
                                    </div>
                                )}

                                <button 
                                    type="submit" 
                                    className="btn btn-outline-secondary my-5"
                                    data-bs-dismiss="modal" 
                                >
                                    Post
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bacheca;