const Restaurant = require('../../models/RestaurantModel');


async function handle_request(msg, callback){

    try{
        const restaurant = await Restaurant.findOne({resEmail: msg.resUsername});
        console.log("customer "+restaurant);
        const result = await restaurant.comparePassword(msg.resPassword);
        console.log("Result from compare: "+result);

        let restId = restaurant._id.toString();
        if(result){
            console.log("Login successful");
            callback(null, { response_code: 200, response_data: restaurant});
        } else {
            callback(null, { response_code: 400, response_data: "Invalid login credentials."});
        }
      } catch(err){
            console.log("Err : "+err);
            callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
      }

};

exports.handle_request = handle_request;