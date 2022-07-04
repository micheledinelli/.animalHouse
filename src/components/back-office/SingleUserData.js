import React, { useEffect, useState } from "react";
import { useStateWithCallback } from "../../hooks/useStateWithCallback";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const SingleUserData = () => {

    const userId = useParams().id;

    const [userData, setUserData] = useStateWithCallback({
        id: "",
        name: "",
        surname: "",
        email: "",
        role: "", 
    });

    const [scoreData, setScoreData] = useState();

    const [securityPhrase, setSecurityPhrase] = useState({
        resetPhrase: "",
        deletePhrase: ""
    });

    const [deleted, setDeleted] = useState(false);

    const [jsonEdited, setJsonEdited] = useState('');

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
        
        setUserData(response.data, async (prevValue, newValue) => {
            
            try {
                const scoreResponse = await axios.get(`http://localhost:8080/api/scores/${newValue.email}`);
                
                if(scoreResponse.status == 200){ 
                    setScoreData(scoreResponse.data); 
                }

            } catch(error) {
                if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Conncetion refused");
                }
            }   
        });
    }

    useEffect(() => {

        getUserById();
        setJsonEdited(JSON.stringify(userData, 
            ['name', 'surname', '_id', 'role', 'email'], 2));
    }, [userData._id]);

    const handleChangeSecurityPhrase = ({target: input}) => {
        setSecurityPhrase({...securityPhrase, [input.name]: input.value});
    }

    const handleSubmitResetPassword = async (e) => {
        e.preventDefault();

        try {
            if( securityPhrase.resetPhrase === "reset123") {
                const url = "http://localhost:8080/api/recoverpw";
                const res = await axios.post(url, {etr: userData.email});
                toast.success(res.data.message);
            } else {
                toast.error("incorrect security phrase")
            }
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Conncetion refused");
            }
        }
    }

    const handleSubmitDeleteUser = async (e) => {
        e.preventDefault();
        try {
            if(securityPhrase.deletePhrase === "delete456") {
                const response = await axios.delete(`http://localhost:8080/api/users/${userId}`);
                toast.error(response.data.message);
                setDeleted(true);
            } else {
                toast.error("incorrect security phrase")
            }
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Conncetion refused");
            }
        }
    }

    const handleSumbitEditedJson = async (e) => {
        e.preventDefault();
        try {
            // This will throw an exception handled by the catch
            let body = JSON.parse(jsonEdited);
                
            const response = await axios.post(`http://localhost:8080/api/users/${userId}`, body);
            toast.success(response.data.message);
        
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error);
            }
        }
    }

    const copyToClipBoard = () => {
        const icon = document.getElementById("copy-to-clipboard-icon");
        icon.classList.remove("bi-clipboard");
        icon.classList.add("bi-clipboard-check");
        toast.success("copied to clipboard");

        window.setTimeout(() => {
            icon.classList.add("bi-clipboard");
            icon.classList.remove("bi-clipboard-check");

        }, 3000);

        navigator.clipboard.writeText(JSON.stringify(userData));
    }

    if(deleted) {

        return <Navigate to="/backOffice/personalData" replace state={{deleted: deleted}}/>

    } else {
        return(
            <div className="container-fluid">
                <ToastContainer />
                <div className="row">
                    <div className="col-lg-2 col-side-bar-single-user">
                        <nav className="bg-primary navbar-expand-lg side-bar-single-user">
                            <div className="container">
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggledDiv" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                                    <span>
                                        <i className="bi bi-three-dots text-white"></i>
                                    </span>
                                </button>

                                <div className="collapse navbar-collapse" id="toggledDiv">
                                    <ul className="navbar-nav d-flex flex-column">
                                        <li className="nav-item mx-3 my-3">
                                            <a className="btn btn-outline-light fs-5 nav-btn" href="./">
                                                <i className="bi bi-arrow-left-circle"></i>
                                            </a>
                                        </li>
                                        <li className="nav-item mx-3 my-3">
                                            <a
                                                className="btn nav-btn btn-outline-light fs-5"
                                                data-bs-toggle="modal"
                                                data-bs-target="#reset-password-modal"
                                                href="">
                                                Reset pw
                                            </a>
                                        </li>
                                        <li className="nav-item mx-3 my-3">
                                            <a
                                                className="btn nav-btn btn-outline-light fs-5"
                                                data-bs-toggle="modal"
                                                data-bs-target="#delete-password-modal"
                                                href="">
                                                Delete
                                            </a>
                                        </li>
                                        <li className="nav-item mx-3 my-3">
                                            <a
                                                className="btn nav-btn btn-outline-light fs-5"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit-json-modal"
                                                href="">
                                                Edit as JSON
                                                (beta)
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="col-lg-5 d-flex align-items-center justify-content-center">
                        <div className="card shadow-sm position-relative">
                            <div className="position-absolute top-0 start-100 translate-middle shadow-lg">
                                <button
                                    onClick={copyToClipBoard}
                                    className="btn btn-light"
                                    style={{fontSize:"1.8rem"}}
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="bottom"
                                    title="Copy as Json"
                                >
                                        <i className="bi bi-clipboard" id="copy-to-clipboard-icon"></i>
                                </button>
                            </div>
                            <div className="card-body">
                                <p className="card-title display-2 my-4">{userData.name}</p>
                                <p className="lead">id: <b>{userData._id}</b></p>
                                <p className="lead">name: <b>{userData.name}</b></p>
                                <p className="lead">surname: <b>{userData.surname}</b></p>
                                <p className="lead">email: <b>{userData.email}</b></p>
                                <p className="lead">role: <b>{userData?.role || 1000}</b></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 text-center">
                        <div className="container row">
                            <div className="col-lg-12">
                                <div>
                                    <h1>Highscores</h1>
                                    <ul className="list-group mt-3 mb-3">
                                        {   
                                            scoreData &&    
                                                scoreData
                                                    .sort((a,b) => b.points - a.points )
                                                    .filter((elem) => elem.gameName == 'hangman')
                                                    .slice(0, 1)
                                                    .map((e) => (
                                                        <li className="list-group-item d-flex justify-content-between align-items-center" key={e._id}>
                                                            {e.gameName}
                                                            <span className="badge bg-primary rounded-pill">{e.points} / 100</span>
                                                        </li>
                                                    ))
                                        }
                                        {/* {
                                            scoreData &&
                                                scoreData
                                                    .sort((a, b) => b.poins - a.points)
                                                    .filter((elem) => elem.gameName == 'memory')
                                                    .slice(0, 1)
                                                    .map((e) => (
                                                        <li className="list-group-item d-flex justify-content-between align-items-center" key={e._id}>
                                                            {e.gameName}
                                                            <span className="badge bg-primary rounded-pill">{e.points} / 100</span>
                                                        </li>
                                                    ))
                                        }
                                        {
                                            scoreData &&
                                                scoreData
                                                    .sort((a, b) => b.poins - a.points)
                                                    .filter((elem) => elem.gameName == 'otherGame')
                                                    .slice(0, 1)
                                                    .map((e) => (
                                                        <li className="list-group-item d-flex justify-content-between align-items-center" key={e._id}>
                                                            {e.gameName}
                                                            <span className="badge bg-primary rounded-pill">{e.points} / 100</span>
                                                        </li>
                                                    ))
                                        } */}
                                    </ul>
                                    <h1>Preferences</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Reset pw modal */}
                <div className="modal fade" id="reset-password-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Reset password</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className="text-center" onSubmit={handleSubmitResetPassword}>
                                    <p>Type <b>reset123</b> to reset user password</p>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            name="resetPhrase"
                                            className="form-control"
                                            placeholder="security phrase"
                                            onChange={handleChangeSecurityPhrase}
                                            required
                                        />
                                        <label htmlFor="newPassword">security phrase</label>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-outline-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Reset password
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Delete user modal */}
                <div className="modal fade" id="delete-password-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete User</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className="text-center" onSubmit={handleSubmitDeleteUser}>
                                    <p>Type <b>delete456</b> to delete user: {userData._id}</p>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            name="deletePhrase"
                                            className="form-control"
                                            placeholder="security phrase"
                                            onChange={handleChangeSecurityPhrase}
                                            autoComplete="off"
                                            required
                                        />
                                        <label htmlFor="deletePhrase">security phrase</label>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-outline-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Delete user
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Edit as JSON modal */}
                <div className="modal fade" id="edit-json-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit as JSON</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p className="lead">Available operations</p>
                                <ul className="navbar-nav my-3">
                                    <li>Add role property</li>
                                    <li>Modify existing properties</li>
                                </ul>

                                <form className="text-center" onSubmit={handleSumbitEditedJson}>
                                    <div className="form-floating mb-3">
                                        <textarea
                                            type="text"
                                            name="json-edit"
                                            className="form-control"
                                            autoComplete="off"
                                            style={{height: "200px", fontSize: "1.5rem"}}
                                            spellCheck="false"
                                            value={ jsonEdited }
                                            onChange={ e => setJsonEdited(e.target.value) }
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-outline-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleUserData;