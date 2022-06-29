const nodemailer = require('nodemailer');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const randpw = require('../scripts/randomizepw');

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: "project.sayonara@outlook.it",
        pass: "sayonara42"
    }
})

router.post('/', async (req, res) => {
    try {
        
        const user = await User.findOne({email: req.body.etr});
        if(!user) {
            return res.status(401).send({message: 'invalid email or password'});
        }

        // var random_token = await randpw.getRandPw();
        var random_token = "";
        for(let i = 0; i < 7; i++) {
            random_token += Math.round(Math.random());
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(random_token, salt);

        const filter = {email: req.body.etr};
        const update = {password: hashPassword};

        const doc = await User.updateOne(filter, update);
        
        if(doc.modifiedCount != 1) {
            return res.status(400).send({message: 'an error occured'});
        }

        const emailToRecover = req.body.etr;
        
        const options = {
            from: "project.sayonara@outlook.it",
            to: emailToRecover,
            subject: 'Recover Password Animal House',
            text: '',
            html: 
                    `<h3>Password reset</h3>
                        <p>You can access with the following password: <b>${random_token}</b></p>
                        <p>We suggest you to change this temporary password as soon as possible</p>` 
        }

        transporter.sendMail(options, (err, info) => {
            if(err) {
                return res.status(400).send({message: "error sending the email, do you have an account?"});
            } else {
                return res.status(200).send({message: "email sent"});
            }
        });

    } catch (error) {
        res.status(500).send({error: "internal server error"});
    }
})

module.exports = router;