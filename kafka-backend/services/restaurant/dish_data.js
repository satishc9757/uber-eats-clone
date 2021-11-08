const Dish = require('../../models/DishModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

async function handle_request(msg, callback){

    const resId = msg.resId;
    //console.log("Inside getRes using mongo id"+resId);

    try{
        let dishesData  = await Dish.find({dishResId: ObjectId(resId)});
            // data = result;

        if(dishesData){
            callback(null, { response_code: 200, response_data: dishesData});
        } else{
            callback(null, { response_code: 200, response_data: {}});
        }


    } catch(err){
        console.error("getRestaurantById : " + err);
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }

};

exports.handle_request = handle_request;