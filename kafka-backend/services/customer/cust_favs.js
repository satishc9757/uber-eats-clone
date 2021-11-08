const Customer = require('../../models/CustomerModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

async function handle_request(msg, callback){
    const data = msg;

    try {
        Customer.updateOne(
            {_id: data.custId},
            { $push: { favRestaurants: ObjectId(data.resId) }},
            (err, result) => {
                if(err){
                  console.error("updateCust : " + err);
                  callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
                } else {
                    callback(null, { response_code: 200,
                    response_data: { message: "Favorite added" }});
                }
            }
            );
    } catch (err) {
        // handle the error
    }

};

exports.handle_request = handle_request;