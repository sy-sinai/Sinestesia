const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    tittle: {
        type: String,
        required: true
    },
    description: String,
    genre: String,
    releaseYear: Number,
    director: String,
    averageRating: {
        type: Number,
        default: 0
    },
    createdAt: { 
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Película',movieSchema);