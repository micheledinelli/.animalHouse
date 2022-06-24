import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import { Fade } from "react-awesome-reveal";

import "../../css/back-office.css";
import 'react-toastify/dist/ReactToastify.css';

import NavbarBackOffice from "./NavbarBackOffice.js";

const PersonalData = () => {

    const [data, setData] = useState(null);
    const [currentDataShown, setCurrentDataShown] = useState(3);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getUserDataFromBackend();
        document.addEventListener('keydown', function(event) {
            if (event.ctrlKey && event.key === ' ') {
                document.querySelector("#search-btn").focus();
            }
        });

    }, []);

    const getUserDataFromBackend = async () => {
        const response = await axios.get("http://localhost:8080/api/users");
        setData(response.data);
    } 
    
    const handleShowMore = () => {
        currentDataShown < data.length ? 
            setCurrentDataShown(currentDataShown + 2) :
            setCurrentDataShown(currentDataShown)
    }

    const handleChange = ({currentTarget: input}) => {
        setSearch(input.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if(search != '') {
            lookUpTable();
        }
    }

    /**
     * Really simple search with regexp
     * eventually updating it to perform
     * more sophisticated search
     */
    const lookUpTable = () => {
        const regexp = new RegExp('.*' + search + '.*');
        let matches = 0;
        let indexesOfMatches = [];

        for(let i = 0; i < data.length; i++) {
            if(regexp.exec(data[i]["name"]) 
                || regexp.exec(data[i]["surname"]) 
                || regexp.exec(data[i]["email"])){
                    matches += 1;
                    indexesOfMatches[i] = true;
            } else {
                indexesOfMatches[i] = false;
            }
        }

        const NotificationOfMatches = () => {
            return(
                <button 
                    className="btn btn-outline-success mx-2"
                    onClick={ e => showMatches(indexesOfMatches)}
                >
                    Found {matches} matches: Show
                </button>
            )
        }

        matches > 0 ? 
            toast.success(<NotificationOfMatches />) : 
            toast.error("No matches found")
    }

    const showMatches = (indexesOfMatches) => {
        
        let tbody = document.getElementsByTagName("tbody")[0];
        tbody.innerHTML = '';

        const showMoreBtn = document.getElementById("show-more-btn");
        if(showMoreBtn) { showMoreBtn.remove() }

        const restoreBtn = document.getElementById("restore-btn");
        if(!restoreBtn) {
            const button = document.createElement("button");
            button.classList.add("btn");
            button.classList.add("btn-outline-primary");
            button.classList.add("btn-lg");
            button.innerHTML = "Restore";
            button.id = "restore-btn";
    
            button.onclick = () => {
                window.location.href = window.location.href;
            }

            document.getElementById("options-div")?.appendChild(button);
        }

        for(let i = 0; i < data.length; i++) {
            if(indexesOfMatches[i]) {
                let tr = document.createElement("tr");
                let tdName = document.createElement("td");
                let tdSurname = document.createElement("td");
                let tdEmail = document.createElement("td");
                let tdInfo = document.createElement("td");
                
                let anchor = document.createElement("a");

                anchor.classList.add("btn");
                anchor.classList.add("btn-outline-primary");
                anchor.href = `personalData/${data[i]["_id"]}`;
                anchor.innerHTML = `open info`;
                
                tdName.innerHTML = data[i]["name"];
                tdSurname.innerHTML = data[i]["surname"];
                tdEmail.innerHTML = data[i]["email"];
                tdInfo.appendChild(anchor);

                tr.appendChild(tdName);
                tr.appendChild(tdSurname);
                tr.appendChild(tdEmail);
                tr.appendChild(tdInfo);

                tbody.appendChild(tr);
            }
        }
    }

    return(
        <div>
            <NavbarBackOffice />
            <ToastContainer />
            <div className="container mt-5">
                <form className="" role="search" onSubmit={handleSearch}>
                    <input
                        className="form-control me-2" 
                        type="search" 
                        placeholder="ctrl + space to search" 
                        onChange={handleChange}
                        id="search-btn"
                    />
                    <div className="mt-3 d-flex justify-content-center">
                        <button 
                            className="mx-2 btn btn-outline-success" 
                            type="submit">
                                Search
                        </button>
                        <a 
                            onClick={handleShowMore}
                            id="show-more-btn"
                            className="mx-2 btn btn-outline-secondary">
                            More
                        </a> 
                        <a 
                            className="mx-2 btn btn-outline-danger"
                            onClick={(e) => window.location.href = window.location.href }>
                                Restore
                        </a>
                    </div>
                </form>
            </div>  
            <div className="table-responsive mt-5 container">
                <table className="table text-center table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Surname</th>
                            <th scope="col">Email</th>
                            <th scope="col">Personal page</th>
                        </tr>
                    </thead> 
                    <tbody>
                        {
                            data &&
                                data.slice(0, currentDataShown).map((e) => (
                                    <tr key={e._id}>
                                        <td>{e.name}</td>
                                        <td>{e.surname}</td>
                                        <td>{e.email}</td>
                                        <td>
                                            <a 
                                                href={`personalData/${e._id}`} 
                                                className="btn btn-outline-primary"
                                            >
                                                <i className="bi bi-person-circle"></i>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PersonalData;