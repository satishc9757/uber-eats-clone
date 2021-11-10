const Restaurant = require('../../models/RestaurantModel');


async function handle_request(msg, callback){
    console.log("Inside validate cust msg : "+msg.resId)
    try{
        const restaurant = await Restaurant.findById(msg.resId);
        console.log("restaurant "+restaurant);

        if(restaurant){
            console.log("User exists");
            callback(null, { response_code: 200, response_data: restaurant});

        } else {
            callback(null, { response_code: 400, response_data: "User does not exist"});
        }
    } catch(err){
        console.log("Err : "+err);
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }
    console.log("after callback");

};

exports.handle_request = handle_request;