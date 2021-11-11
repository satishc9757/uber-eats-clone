const Restaurant = require('../../models/RestaurantModel');


async function handle_request(msg, callback){
    console.log("Inside validate res msg : "+msg.resId)
    const resId = msg.resId;
    const resUsername = msg.resEmail;
    try{
        let restaurant = await Restaurant.findById(resId);

        // if(resId){
        //     restaurant = await Restaurant.findById(resId);
        // } else if(resUsername){
        //     restaurant = await Restaurant.findOne({resEmail: resUsername});
        // }
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