const Dish = require('../../models/DishModel');


async function handle_request(msg, callback){

    const dishId = msg.dishId;
    //console.log("Inside getRes using mongo id"+resId);

    try{
        let dishData  = await Dish.findById(dishId);
            // data = result;

        if(dishData){
            callback(null, { response_code: 200, response_data: dishData});
        } else{
            callback(null, { response_code: 200, response_data: {}});
        }


    } catch(err){
        console.error("dish data by id : " + err);
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }

};

exports.handle_request = handle_request;