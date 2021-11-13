const Order = require('../../models/OrdersModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


async function handle_request(msg, callback){
    const custId = msg.custId;

    try{
        let orders  = await Order.find({orderCustId : ObjectId(custId)});
        let deliveryAddress = [];

        if(orders){

            orders.forEach(order => {
                console.log("Addresssssss: "+JSON.stringify(order.orderAddress));
                deliveryAddress.push({
                street: order.orderAddress.street,
                city: order.orderAddress.city,
                state: order.orderAddress.state,
                zipcode: order.orderAddress.zipcode,
                country: order.orderAddress.country
            })

        });
            let deliveryAddressSet = new Set();

            deliveryAddress.forEach(add => {
                deliveryAddressSet.add(JSON.stringify(add));
            });

            deliveryAddress = [];
            deliveryAddressSet.forEach(address => deliveryAddress.push(JSON.parse(address)));

            callback(null, { response_code: 200, response_data: deliveryAddress});
        } else{
            callback(null, { response_code: 200, response_data: {}});
        }

    } catch(err){
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }

};

exports.handle_request = handle_request;