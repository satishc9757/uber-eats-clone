const mongoose = require('mongoose');
const AddressSchema = require('./AddressModel');
const schema = mongoose.Schema;

var customerSchema = new mongoose.Schema({
  custFirstName: {type: String, required: true},
  custLastName: {type: String, required: true},
  custEmail: {type: String, required: true},
  custAddress: {type: AddressSchema, required: false},
  custImage: {type: String, required: false},
  custDob: {type: Date, required: false},
  custNickname: {type: String, required: false},
  custPhone: {type: String, required: false},
  custAbout: {type: String, required: false},
});

const customerModel = mongoose.model('customer', customerSchema);
module.exports = customerModel;