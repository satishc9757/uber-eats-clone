const Dish = require('../../models/DishModel');

async function handle_request(msg, callback){
  const data = msg;
  Dish.updateOne(
    {_id: data._id},
    {
        $set: {
          dishName: data.dishName,
          dishMainIngredients: data.dishMainIngredients,
          dishPrice: data.dishPrice,
          dishDesc: data.dishDesc,
          dishCategory: data.dishCategory,
          dishType: data.dishType,
        }
    },
    (err, result) => {
        if(err){
          console.error("Err in updateDish : " + err);
          callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
        } else {
            callback(null, { response_code: 200, response_data : "Dish updated successfully"});

        }
    });

};

exports.handle_request = handle_request;