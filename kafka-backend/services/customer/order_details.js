const Order = require('../../models/OrdersModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

async function handle_request(msg, callback){
    const orderId = msg.orderId;

    try{
        let orders  = await Order.findById(orderId);
            // data = result;
        console.log("orders output: "+JSON.stringify(orders[0]));
        console.log("orders output: "+orders[1]);
        let ordersDetailsData = [];
        if(orders){
            orders.orderItems.forEach(item => ordersDetailsData.push({
                dishName: item.itemName,
                odQuantity: item.itemQuantity,
                odPrice: getFormatedAmount(item.itemPrice)
            }));

            callback(null, { response_code: 200, response_data: ordersDetailsData});
        } else{
            callback(null, { response_code: 200, response_data: {}});
        }

    } catch(err){
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }

};


function getFormatedAmount(num){
    return (Math.round(num * 100) / 100).toFixed(2);
}

exports.handle_request = handle_request;