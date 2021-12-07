const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OrderItemSchema = Schema({
    itemName: String,
    itemPrice: Number,
    itemQuantity: Number
  });

module.exports = OrderItemSchema;