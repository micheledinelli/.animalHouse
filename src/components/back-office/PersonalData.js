import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import { Fade } from "react-awesome-reveal";

import "../../css/back-office.css";
import 'react-toastify/dist/ReactToastify.css';

import NavbarBackOffice from "./NavbarBackOffice";

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

            document.getElementById("options-div").appendChild(button);
        }

        for(let i = 0; i < data.length; i++) {
            if(indexesOfMatches[i]) {
                let tr = document.createElement("tr");
                let tdName = document.createElement("td");
                let tdSurname = document.createElement("td");
                let tdEmail = document.createElement("td");
                let tdId = document.createElement("td");

                tdId.innerHTML = data[i]["_id"];
                tdName.innerHTML = data[i]["name"];
                tdSurname.innerHTML = data[i]["surname"];
                tdEmail.innerHTML = data[i]["email"];

                tr.appendChild(tdId);
                tr.appendChild(tdName);
                tr.appendChild(tdSurname);
                tr.appendChild(tdEmail);

                tbody.appendChild(tr);
            }
        }
    }

    return(
        <div className="container">
            <NavbarBackOffice />
            <ToastContainer />
            <div className="container mt-5">
                <form className="d-flex" role="search" onSubmit={handleSearch}>
                    <input
                        className="form-control me-2" 
                        type="search" 
                        placeholder="ctrl + space" 
                        onChange={handleChange}
                        id="search-btn"
                    />
                    <button className="btn btn-outline-secondary" type="submit">Search</button>
                    <button 
                        onClick={handleShowMore}
                        id="show-more-btn"
                        className="btn btn-outline-primary">
                        Show more
                    </button>
                </form>
            </div>  

            <div className="container mt-5">
                <table className="table table-bordered table-hover text-center">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Surname</th>
                            <th scope="col">Email</th>
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