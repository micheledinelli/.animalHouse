import React from "react";
import { useState } from "react";
import axios from "axios";

const TmpSchemaForImages = () => {
    
    const [messagesData, setMessagesData] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

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

    const handleTmp =  (e) => {
        e.preventDefault();
        let data = new FormData();
        data.set('photo', selectedImage);
        data.set("author", "mic");
        // SET OTHER BODY ATTR  !!!
        // data.set("body", "hello guys");
        // data.set("title", "My new post");
        // ...
        try {
            axios.post("http://localhost:8080/api/wall/posts", data, {
                headers: {
                  'accept': 'application/json',
                  'Accept-Language': 'en-US,en;q=0.8',
                  'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            })
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <form onSubmit={handleTmp}>
                <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                        setSelectedImage(event.target.files[0]);
                    }}
                />
                <input type="submit"></input>
                {
                    selectedImage && (
                        <div>
                            <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                        </div>
                    )
                }
            </form>
            {
                messagesData && 
                    messagesData.map((elem) => {
                        if(elem.image) {
                            const base64S = arrayBufferToBase64(elem.image.data.data)
                            return <img src={`data:image/png;base64,${base64S}`}></img>
                        }
                    })
            }
        </>
    )
}

export default TmpSchemaForImages;