const mongoose = require('mongoose');
const schema = mongoose.Schema;

let ordersSchema = new mongoose.Schema({
    orderCustId: {type: String, required: true},
    orderRestaurantId: {type: String, required: true},
    orderAddress: {type: AddressSchema, required: true},
    orderTimestamp: {type: Date, required: true},
    orderStatus: {type: String, required: false},
    orderDeliveryFee: {type: Float32Array, required: false},
    orderServiceFee: {type: Float32Array, required: false},
    orderTotal: {type: Float32Array, required: false}
});

const orderModel = mongoose.model('order', ordersSchema);
module.exports = orderModel;
