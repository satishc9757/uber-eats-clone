const Order = require('../../models/OrdersModel');


async function handle_request(msg, callback){
    const data = msg;
    const orderId = data.orderId;

    try {
        Order.updateOne(
                {_id: orderId},
                {
                    $set: {
                        orderStatus: "Cancelled"
                    }
                },
                (err, result) => {
                    if(err){
                        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
                    } else {
                        callback(null, { response_code: 200,
                        response_data: { message: "Order cancelled" }});
                    }
                }
                );
    } catch (err) {
        // handle the error
    }
};

exports.handle_request = handle_request;