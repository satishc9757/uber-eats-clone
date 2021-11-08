const Restaurant = require('../../models/RestaurantModel');


async function handle_request(msg, callback){

    const resId = msg.resId;
    //console.log("Inside getRes using mongo id"+resId);

    try{
        let restaurant  = await Restaurant.findById(resId);
            // data = result;

        if(restaurant){
            callback(null, { response_code: 200, response_data: {
                resId: restaurant._id,
                resName: restaurant.resName,
                resEmail: restaurant.resEmail,
                resStreet: restaurant.resAddress.street,
                resCity: restaurant.resAddress.city,
                resStreet: restaurant.resAddress.street,
                resState: restaurant.resAddress.state,
                resZipcode: restaurant.resAddress.zipcode,
                resImage: restaurant.resImage,
                resDescription: restaurant.resDescription,
                resPhone: restaurant.resPhone,
            }});
        } else{
            callback(null, { response_code: 200, response_data: {}});
        }


    } catch(err){
        console.error("getRestaurantById : " + err);
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }

};

exports.handle_request = handle_request;