const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');

const foodSchema =  new mongoose.Schema({
    name: { 
        type: String,
        require: true
    },
    description: String, 
    countryOfOrigin: String,
    ingredients: [String],
    averageRating: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comida',foodSchema);