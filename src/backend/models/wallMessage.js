const mongoose = require('mongoose');

const wallMessage = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    category: {type: String, enum: ["Walks", "Food", "Parks", "Stores", "Sitter"]},
    likes: { type: Number, default: 0 },
    comments: [{author: String, text: String}],
    date: { type: Date, default: Date.now },
    image: { data: Buffer, contentType: String }  
});

const WallMessage = mongoose.model("wallMessage", wallMessage);

module.exports = { WallMessage };
