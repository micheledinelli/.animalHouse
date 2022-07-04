const router = require('express').Router();
const {User} = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (req,res) => {
    try {
        
        const user = await User.findOne( {email: req.body.email});
        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        );

        if(!validPassword) {
            return res.status(401).send({message: "invalid password, retry"});
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

        const filter = {email: req.body.email};
        const update = {password: hashPassword};

        const doc = await User.updateOne(filter, update);
        
        if(doc.modifiedCount == 1) {
            return res.status(201).send({message: "password changed"});
        } else {
            return res.status(400).send({message: "an error occured"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({error: "internal server error"});
    }
})

module.exports = router;

