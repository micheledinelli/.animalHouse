import React from "react";
import { useEffect, useState } from "react";
import axios from  "axios";
import Auth  from "../Auth";

const Test = () => {
    
    const [data, setData] = useState({
        scores: []
    });

    useEffect( () => {
        async function fetchData() {
            try {
                const url = "http://localhost:8080/api/scores";
                const {data: res} = await axios.get(url);
                setData({scores: res});
            } catch (error) {
                if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                }
            }
        }
        fetchData();
        
    }, []);


    console.log(Auth.getInstance());
    return(
        <>
            welcome to tests
        </>
    )
    // return(
    //     <div>
    //         {
    //             data.scores.map((e) => {
    //                 return <div key={e.email}>{ e.email }</div>
    //             })
    //         }
    //     </div>
    // );
}

export default Test;