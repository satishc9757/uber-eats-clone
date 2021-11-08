const Order = require('../../models/OrdersModel');

async function handle_request(msg, callback){
  const data = msg;
  Order.updateOne(
    {_id: data.orderId},
    {
        $set: {
            orderStatus: data.orderStatus
        }
    },
    (err, result) => {
        if(err){
          console.error("Err in updateDish : " + err);
          callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
        } else {
            callback(null, { response_code: 200, response_data : "Order status updated successfully"});

        }
    });

};

exports.handle_request = handle_request;