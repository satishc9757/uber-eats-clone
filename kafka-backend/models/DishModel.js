const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

let dishSchema = new mongoose.Schema({
    dishName: {type: String, required: true},
    dishResId: {type: ObjectId, required: true},
    dishMainIngredients: {type: String, required: true},
    dishImage: {type: String, required: false},
    dishPrice: {type: String, required: false},
    dishDesc: {type: String, required: false},
    dishCategory: {type: String, required: false},
    dishType: {type: String, required: false}
});

const dishModel = mongoose.model('dish', dishSchema);
module.exports = dishModel;
