const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const FavoritesSchema = Schema({
    resId: ObjectId,
    resName: String,
    resImage: String,
    resDescription: String,
  });

module.exports = FavoritesSchema;