const mongoose = require('mongoose');
const schema = mongoose.Schema;

let dishSchema = new mongoose.Schema({
    dishName: {type: String, required: true},
    dishResId: {type: String, required: true},
    dishMainIngredients: {type: String, required: true},
    dishImageLink: {type: String, required: true},
    dishPrice: {type: String, required: false},
    dishDesc: {type: String, required: false},
    dishCategory: {type: String, required: false},
    dishType: {type: String, required: false}
});

const dishModel = mongoose.model('dish', dishSchema);
module.exports = dishModel;
