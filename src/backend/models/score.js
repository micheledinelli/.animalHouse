const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    points: { type: String, required: true},
    gameName: { type: String, required: true}
});

const Score = mongoose.model("score", scoreSchema);

module.exports = { Score };
