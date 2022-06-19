const nodemailer = require('nodemailer');
const router = require('express').Router();

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: "project.sayonara@outlook.it",
        pass: "sayonara42"
    }
})

router.post('/', async (req, res) => {
    try {
        
        const emailToRecover = req.body.etr;
        
        const options = {
            from: "project.sayonara@outlook.it",
            to: "dinellimichele00@gmail.com",
            subject: 'Recover Password Animal House',
            text: 'This is an email sent for debug purpose',
            html: '<p>wonderful</p><br><h1>hello</h1>'
        }

        // transporter.sendMail(options, (err, info) => {
        //     if(err) {
        //         console.log(err);
        //         return;
        //     } else {
        //         res.status(200).send({message: "email sent"});
        //     }
        // });

    } catch (error) {
        res.status(500).send({error: "internal server error"});
    }
})

module.exports = router;