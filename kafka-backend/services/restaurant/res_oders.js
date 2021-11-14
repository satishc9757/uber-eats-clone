const Order = require('../../models/OrdersModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

async function handle_request(msg, callback){
    const resId = msg.resId;

    try{
        let orders  = await Order.aggregate([
            { $match: { "orderRestaurantId": ObjectId(resId) } },
            { $lookup:{
                from: "customers",
                localField: "orderCustId",
                foreignField: "_id",
                as: "cust_info"},
            },
            { $sort : { "orderTimestamp" : -1 } }
        ]);
            // data = result;
        console.log("orders output: "+JSON.stringify(orders[0]));
        console.log("orders output: "+orders[1]);
        let ordersData = [];
        if(orders){

            orders.forEach(order => ordersData.push({
                orderId: order._id,
                orderTotal: getFormatedAmount(order.orderTotal),
                custFirstName: order.cust_info[0] ? order.cust_info[0].custFirstName : null,
                custLastName: order.cust_info[0] ? order.cust_info[0].custLastName : null,
                custId: order.cust_info ? order.cust_info._id : null,
                street: order.orderAddress ? order.orderAddress.street : null,
                city: order.orderAddress ? order.orderAddress.city : null,
                state: order.orderAddress ? order.orderAddress.state : null,
                zipcode: order.orderAddress ? order.orderAddress.zipcode : null,
                orderTimestamp: getFormatedDate(new Date(order.orderTimestamp)),
                orderStatus: order.orderStatus,
                orderDeliveryFee: getFormatedAmount(order.orderDeliveryFee),
                orderServiceFee: getFormatedAmount(order.orderServiceFee),
                specialInstructions: order.specialInstructions
            }));

            callback(null, { response_code: 200, response_data: ordersData});
        } else{
            callback(null, { response_code: 200, response_data: {}});
        }

    } catch(err){
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }

};

function getFormatedDate(date){
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}


function getFormatedAmount(num){
    return (Math.round(num * 100) / 100).toFixed(2);
}
exports.handle_request = handle_request;