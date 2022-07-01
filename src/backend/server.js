require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const connection = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const scoreRoutes = require('./routes/scores');
const changePwRoutes = require('./routes/changepw');
const recoverPwRoutes = require('./routes/recoverpw');

// Db connection
connection();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/api/changepw', changePwRoutes);
app.use('/api/recoverpw', recoverPwRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});


// Waiting for a valid api for animal dictionary

var animals = [];
fs.readFile(path.join(__dirname, '') + '/animal-dictionary.txt', function(err, data) {
    
    if(err) throw err;
       animals = data.toString().split("\n");

});

app.get("/api/animals/rand", (req, res) => {
    try {
        let randomIndex = Math.round(Math.random() * animals.length);
        let randomName = animals[randomIndex].replace(/\r\n|\n|\r/gm, '')
        res.status(200).send(randomName);
    } catch (error) {
        res.status(500).send({message: "Error providing hangman random word..."});
    }
});
