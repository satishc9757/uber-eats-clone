const Order = require('../../models/OrdersModel');
const Address = require('../../models/AddressModel');
const OrderItem = require('../../models/OrderItem');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

async function handle_request(msg, callback){
    const data = msg;
    const address = data.deliveryAddress;
    const items = data.cartItems;

    const orderItems = items.map(item => {
        return {
            itemName: item.dishName,
            itemPrice: item.dishPrice,
            itemQuantity: item.dishQuantity
        };
    });

    let order = new Order({
        orderCustId: ObjectId(data.custId),
        orderRestaurantId: ObjectId(data.resId),
        orderAddress: {
            street: address.custStreet,
            city: address.custCity,
            state: address.custState,
            zipcode: address.custZipcode,
            country: address.custCountry,
        },
        orderItems: orderItems,
        orderTimestamp: new Date(),
        orderStatus: "Order Placed",
        orderDeliveryFee: data.deliveryFee,
        orderServiceFee: data.serviceFee,
        orderTotal: data.cartTotal
    });

    order.save((err, result) => {
        if(err){
            console.log("Error while saving order data")
            callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
        } else {

            callback(null, { response_code: 200,
                response_data: { message: "Order Created" }});
        }
    });

};

exports.handle_request = handle_request;