import React, { useState } from "react";
import { useEffect } from "react";

import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PersonalData = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
    
        getUserDataFromBackend();
    
    }, []);

    const getUserDataFromBackend = async () => {
        const response = await axios.get("http://localhost:8080/api/users");
        console.log(response.data);
        setData(response.data);
    }                               

    return(
        <div className="text-center">
            {
                data &&
                    data.map((e) => (
                        <div key={e.email}>{e.name}</div>
                    ))
            }
        </div>
    )
}

export default PersonalData;