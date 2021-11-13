const mongoose = require('mongoose');
const AddressSchema = require('./AddressModel');
const OrderItemSchema = require('./OrderItem');
const schema = mongoose.Schema;

let ordersSchema = new mongoose.Schema({
    orderCustId: {type: schema.ObjectId, required: true},
    orderRestaurantId: {type: schema.ObjectId, required: true},
    orderAddress: {type: AddressSchema, required: true},
    orderItems: [{type: OrderItemSchema, required: true}],
    orderTimestamp: {type: Date, required: true},
    orderStatus: {type: String, required: false},
    orderDeliveryFee: {type: Number, required: false},
    orderServiceFee: {type: Number, required: false},
    orderTotal: {type: Number, required: false},
    specialInstructions: {type: String, required: false},
});

const orderModel = mongoose.model('order', ordersSchema);
module.exports = orderModel;
