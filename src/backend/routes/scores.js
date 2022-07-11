const router = require('express').Router();
const { Score } = require('../models/score');

router.get('/', async(req, res) => {
    try {
        const scores = await Score.find({});
        if(scores && scores.length > 0) {
            res.send(scores);
        } else {
            res.status(400).send({message: "No scores available"});
        }

    } catch (error) {
        res.status(500).send({message: "Internal server error"});
    }
});

router.get('/hangman', async (req, res) => {
    try{

        const scores = await Score.find({gameName: "hangman"}).sort({points: "asc"});
        if(scores && scores.length > 0) {
            res.send(scores);
        } else {
            res.status(400).send({message: "No scores available"});
        }

    } catch (error) {
        res.status(500).send({message: "Internal server error"});
    }
})

router.get('/quiz', async (req, res) => {
    try{
        const scores = await Score.find({gameName: "quiz"}).sort({points: "asc"});
        if(scores && scores.length > 0) {
            res.send(scores);
        } else {
            res.status(400).send({message: "No scores available"});
        }

    } catch (error) {
        res.status(500).send({message: "Internal server error"});
    }
})

router.get('/memory', async (req, res) => {
    try{
        const scores = await Score.find({gameName: "memory"}).sort({points: "asc"});
        if(scores && scores.length > 0) {
            res.send(scores);
        } else {
            res.status(400).send({message: "No scores available"});
        }

    } catch (error) {
        res.status(500).send({message: "Internal server error"});
    }
})

router.get('/:id', async(req, res) => {
    try {
        if(req.params.id) {
            const scores = await Score.find({userId: req.params.id});
            if(scores && scores.length > 0) {
                res.send(scores);
            } else {
                res.status(400).send({message: "No scores available"});
            }
        }

    } catch (error) {
        res.status(500).send({message: "Internal server error"});
    }
});

router.post ('/', async (req, res) => {
    const filter = {userId: req.body.userId, gameName: req.body.gameName}
    try {
        const scoreExists = await Score.findOne(filter);
        
        if(scoreExists) {
            const prevPoints = scoreExists.points;
            const newPoints = Number(prevPoints) + Number(req.body.points);
            const doc = await Score.updateOne(filter, {points: newPoints})
            if(doc.modifiedCount > 0) { res.status(200).send({message: "points updated!"})}
        } else {
            await new Score({...req.body}).save();
            res.status(201).send({message: "Your score has been saved"});
        }
       
    } catch (error) {
        res.status(500).send({message: "internal server error"});
    }
})

module.exports = router; 