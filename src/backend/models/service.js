const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    serviceName: { type: String, required: true, unique: true},
    bookings: [{userId: String, date: Date}],
});

const Service = mongoose.model("service", serviceSchema);

module.exports = { Service };
