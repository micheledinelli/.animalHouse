const router = require('express').Router();
const nodemailer = require('nodemailer');
const { Service } = require('../models/service');

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: "project.sayonara@outlook.it",
        pass: "sayonara42"
    }
})

router.get('/', async (req, res) => {
    try {
        const services = await Service.find({});
        
        if(services && services.length > 0) {
            res.status(200).send(services)
        } else {
            res.status(400).send({message: "No services data available"})
        }
    } catch (error) {
        res.status(500).send({message: "Internal server error"});
    }
})

router.get('/:serviceName', async (req, res) => {
    try {
        const service = await Service.find({
            serviceName: req.params.serviceName
        })

        if(service) {
            res.status(200).send(service);
        } else {
            res.status(400).send({message: "No services data available"})
        }
    
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal server error"});
    }
})

router.get('/userServices/:userId', async (req, res) => {
    try {
        const service = await Service.find({});
        const servicesBookedByUser = [];
        service.forEach((e) => {
            e.bookings.forEach((booking) => {
                if(booking.userId == req.params.userId) {
                    servicesBookedByUser.push({booking: booking, serviceName: e.serviceName});
                }   
            })
        })

        if(servicesBookedByUser.length > 0) {
            res.status(200).send(servicesBookedByUser);
        } else {
            res.status(400).send({message: "No services data available"})
        }
    
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal server error"});
    }
})

router.post('/:serviceName/bookings/', async (req, res) => {
    try {
        
        const service = await Service.findOne({serviceName: req.params.serviceName});
        const bookings = service.bookings;
        const newBooking = {
            userId: req.body.userId,
            date: req.body.date
        };

        bookings.push(newBooking);
        const doc = await service.updateOne({bookings: bookings});
        if(doc.modifiedCount > 0) {
            const emailAddress = req.body.userId;
        
            const options = {
                from: "project.sayonara@outlook.it",
                to: emailAddress,
                subject: 'Service Booking aut-confirm',
                text: '',
                html: 
                        `<h3>Service booked!</h3>
                            <p>Perfect! you booked ${service.serviceName} service</p>
                            <p>Let's meet on ${req.body.date}, see you!</p>` 
            }

            transporter.sendMail(options, (err, info) => {
                if(err) {
                    return res.status(400).send({message: "error sending the email, do you have an account?"});
                } else {
                    return res.status(200).send({message: "email sent"});
                }
            });

            res.status(200).send({message: "Service booked!"});

        } else {
            res.status(400).send({message: "Some error occured"});   
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal server error"});
    }
})

module.exports = router; 