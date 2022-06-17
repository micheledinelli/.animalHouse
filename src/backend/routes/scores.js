const router = require('express').Router();
const { Score } = require('../models/score');

router.get('/', async(req, res) => {
    try {

        const scores = await Score.find();

        if(scores && scores.length > 0) {
            res.send(scores);
        } else {
            res.status(200).send({message: "No scores available"});
        }

    } catch (error) {
        res.status(500).send({message: "Internal server error"});
    }
});

module.exports = router; 