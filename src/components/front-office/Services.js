import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import NavbarFrontOffice from "./NavbarFrontOffice";
import { Fade } from "react-awesome-reveal";

import PetImage1 from '../../assets/undraw_pet_adoption_2qkw.png';
import PetImage2 from '../../assets/undraw_fish_bowl_uu88.png';
import PetImage3 from '../../assets/undraw_Good_doggy_re_eet7.png';
import PetImage4 from '../../assets/undraw_friends_r511.png';

const Services = () => {

    const [service, setService] = useState();
    const [servicesData, setServicesData] = useState();
    
    const handleClick = (serviceName) => {
        setService(serviceName);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let body = {
            userId: window.localStorage.getItem('user_email'),
            date: document.getElementById("date-choice").value
        }
       
        var todayDate = new Date().toISOString().slice(0, 10);
        if(todayDate > body.date) {
            toast.info("Please choose a date in the future...");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/services/${service}/bookings/`, body);
            if(response.status == 200) {
                toast.success(response.data.message + " you'll receive a confirmation email");
                getData();
            }
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Conncetion refused");
            }
        }
    }
    
    useEffect(() => {
        getData();
    }, [service]);
    
    const getData = async () => {
        try {
            if(service) {
                const response = await axios.get(`http://localhost:8080/api/services/${service}`)
                if(response.status == 200) {
                    setServicesData(response.data);
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

    const Book = (props) => {
        const formStyle = {
            width: "40vw",
        }
        return(
            <Fade>
                <div className="container text-center mt-3" style={formStyle} onSubmit={handleSubmit}>
                    {
                        servicesData && servicesData.map((e) => {
                            
                            let available = e.bookings.length == 10 ? false : true; 

                            if(e.serviceName == props.service) {
                                return(
                                    <div key={e._id}>
                                        <p className="lead display-6" >
                                            Service: <b>{e.serviceName}</b>
                                        </p>
                                        <p className="lead">
                                            Availability: <b>{ 10 - e.bookings.length}</b> left
                                        </p>
                                        <form className="booking-form">
                                            <label htmlFor="date" className="my-2">When do you like to meet?</label>
                                            <input required name="date" className="form-control" type="date" id="date-choice"/>
                                            {
                                                available ? 
                                                    <button type="submit" className="btn btn-lg btn-outline-secondary mt-5">Book now</button> :
                                                    <button type="submit" disabled className="btn btn-lg btn-outline-secondary mt-5">Book now</button>
                                            }
                                        </form>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </Fade>
        )
    }

    return(
        <>
            <ToastContainer />
            <NavbarFrontOffice />
            <div className="container text-center mt-5">
                <Fade delay={800} duration={800} triggerOnce={true}>
                    <p className="display-3">Our Services</p>       
                </Fade>    
                <Fade delay={1800} duration={800} triggerOnce={true}>
                    <p className="lead">at your place</p>     
                </Fade>    
                <div className="row mt-5">
                    <div className="col-sm-8">
                        <img className="img-fluid" src={PetImage1} alt="..."></img>
                    </div>
                    <div className="col-sm-4 align-self-center text-section">
                        <p className="display-4 text-secondary lh-1">Pet Adoption</p>
                        <p className="display-4 text-secondary lh-1">Meet our expert who'll find you an animal to help!</p>
                        <button 
                            className="mt-3 btn btn-lg btn-primary text-white"
                            onClick={(e) => { handleClick("adoption")}}
                        >
                            Book now
                        </button>
                    </div>
                    {
                        service == 'adoption' && <Book service={"adoption"}/>
                    }
                </div>
                <div className="row mt-5" id="to-reverse-mobile">
                    <div className="col-sm-4 align-self-center text-section text-swap-on-bp">
                        <p className="display-4 text-secondary lh-1">Time's never enough</p>
                        <p className="display-4 text-secondary lh-1">We enjoy investing ours for your beloved</p>
                        <button 
                            className="mt-3 btn btn-lg btn-primary text-white"
                            onClick={(e) => { handleClick("lonely")}}
                        >
                            Book now
                        </button>
                    </div>
                    <div className="col-sm-8">
                        <img className="img-fluid img-swap-on-bp" src={PetImage2} alt="..."></img>
                    </div>
                    {
                        service == 'lonely' && <Book service={"lonely"}/>
                    }
                </div>  
                <div className="row mt-5">
                    <div className="col-sm-8">
                        <img className="img-fluid" src={PetImage3} alt="..."></img>
                    </div>
                    <div className="col-sm-4 align-self-center text-section">
                        <p className="display-4 text-secondary lh-1">Dog Sitters</p>
                        <p className="display-4 text-secondary lh-1">The kindest sitters for the bests dogs!</p>
                        <button 
                            className="mt-3 btn btn-lg btn-primary text-white"
                            onClick={(e) => { handleClick("sitters")}}
                        >
                            Book now
                        </button>
                    </div>
                    {
                        service == 'sitters' && <Book service={"sitters"}/>
                    }
                </div>
                <div className="row mt-5 mb-5" id="to-reverse-mobile">
                    <div className="col-sm-4 align-self-center text-section text-swap-on-bp">
                        <p className="display-4 text-secondary lh-1">Let's go on vacation!</p>
                        <p className="display-4 text-secondary lh-1">Let them relax with us!</p>
                        <button 
                            className="mt-3 btn btn-lg btn-primary text-white"
                            onClick={(e) => { handleClick("vacation")}}
                        >
                            Book now
                        </button>
                    </div>
                    <div className="col-sm-8">
                        <img className="img-fluid img-swap-on-bp" src={PetImage4} alt="frontOffice"></img>
                    </div>
                    {
                        service == 'vacation' && <Book service={"vacation"} />
                    }
                </div>  
            </div> 
        </>
    )

}

export default Services;