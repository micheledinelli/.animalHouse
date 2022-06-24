const router = require('express').Router();
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', async(req, res) => {
    try {
        //const {error} = validate(req.body);
        error = false;
        if( error) {
            return res.status(400).send( {message: error.details[0].message} );
        }

        const user = await User.findOne( {email: req.body.email});
        if(user) {
            return res.status(409).send({message: 'user with given email already exists'});
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({...req.body, password: hashPassword}).save();
        res.status(201).send({message: "User created"});
    } catch (error) {
        res.status(500).send({message: "Internal server error"});
    }
})

router.post("/:id", async (req, res) => {
    try {
        if(req.body.id) {
            const userId = req.body.id;
            const user = await User.findOne({_id: userId});
            res.status(200).send(user);
        } else {
            res.status(400).send({message: "Error"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal server error"});
    }
});

router.get("/", async (req, res) => {
    try {
        const user = User.find({}, (err, docs) => {
            if(!err) { 
                res.status(200).send(docs);
            } else {
                res.status(200).send({message: 'no data available'})
            }
        });

    } catch (error) {
        res.status(500).send({message: "Internal server error"})
    }
})

module.exports = router; 