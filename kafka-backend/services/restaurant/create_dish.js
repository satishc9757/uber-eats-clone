const Dish = require('../../models/DishModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


async function handle_request(msg, callback){
    const data = msg;
    console.log("dish object : "+data);
    try {

        let dish = new Dish({
            dishName: data.dishName,
            dishResId: ObjectId(data.resId),
            dishMainIngredients: data.dishMainIngredients,
            dishPrice: data.dishPrice,
            dishDesc: data.dishDesc,
            dishCategory: data.dishCategory,
            dishType: data.dishType,
          });

        dish.save((err, result) => {
            if(err){
                console.log("Error while saving dish data")
                callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
            } else {
                callback(null, { response_code: 200, response_data : result});
            }
        });

    } catch (err) {
        // handle the error
    }

};

exports.handle_request = handle_request;