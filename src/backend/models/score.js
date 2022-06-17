const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    email: { type: String, required: true},
    record: { type: String, required: true},
    gameName: { type: String, required: true}
});

const Score = mongoose.model("score", scoreSchema);

module.exports = { Score };
