const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    album: String,
    artist: String,
    genre: String,
    year: Number,
    averageRating: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Música',musicSchema);