const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    type: { type: String, enum: ['Película', 'Comida', 'Música'], required: true },
    item: { type: mongoose.Schema.Types.ObjectId, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String,
    inkedMovie: { type: mongoose.Schema.Types.ObjectId, ref: 'Película' },
    linkedFood: { type: mongoose.Schema.Types.ObjectId, ref: 'Comida' },
    linkedMusic: { type: mongoose.Schema.Types.ObjectId, ref: 'Música' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reseña', reviewSchema);