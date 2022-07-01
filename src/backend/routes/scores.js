const router = require('express').Router();
const { Score } = require('../models/score');

router.get('/', async(req, res) => {
    try {
        const scores = await Score.find({userId: req.query.userId});

        if(scores && scores.length > 0) {
            res.send(scores);
        } else {
            res.status(200).send({message: "No scores available"});
        }

    } catch (error) {
        res.status(500).send({message: "Internal server error"});
    }
});

router.post ('/', async (req, res) => {
    try {
        await new Score({...req.body}).save();
        res.status(201).send({message: "Your score has been saved"});
    } catch (error) {
        res.status(500).send({message: "Internal server error"});
    }
})

module.exports = router; 