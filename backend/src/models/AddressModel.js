const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AddressSchema = Schema({
    city: String,
    street: String,
    state: String,
    country: String,
    zipcode: Number,
  });

module.exports = AddressSchema;