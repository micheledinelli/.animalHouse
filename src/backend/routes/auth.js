const router = require('express').Router();
const {User} = require('../models/user');
const joi = require('joi');
const bcrypt = require('bcrypt');

router.post('/', async (req,res) => {
    try {
        // const {error} = validate(req.body);
        error = false;

        if(error) {
            return res.status(400).send( {message: error.details[0].message} );
        }

        const user = await User.findOne( {email: req.body.email});
        
        if(!user) {
            return res.status(401).send({message: 'invalid email or password'});
        }

        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        );

        if(!validPassword) {
            return res.status(401).send({message: "invalid email or password"});
        }

        const role = user.role || 1000;

        const token = user.generateAuthToken();
        res.status(200).send({data: token, role: role, message: "logged"});

    } catch (error) {
        res.status(500).send({error: "internal server error"});
    }
})

const validate = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label('Email'),
        password: joi.string().email().required().label('Password')
    });
    return schema.validate(data);
}

module.exports = router;