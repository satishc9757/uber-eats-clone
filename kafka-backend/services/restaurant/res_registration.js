const Restaurant = require('../../models/RestaurantModel');
const Dish = require('../../models/DishModel');


async function handle_request(msg, callback){
    const data = msg;

    try {

        let restaurant = new Restaurant({
            resName: data.resName,
            resEmail: data.resEmail,
            resPassword: data.resPassword,
            resAddress: {
                street: data.resStreet,
                city: data.resCity,
                state: data.resState,
                zipcode: data.resZipcode,
                country: data.resCountry,
            },

        });

        restaurant.save((err, result) => {
            if(err){
                console.log("Error while saving customer data")
                callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
            } else {
                callback(null, { response_code: 200, response_data : {
                    resName: data.resName,
                    resEmail: data.resEmail,
                    resCity: data.resCity,
                  }});
            }
        });

    } catch (err) {
        // handle the error
    }

};

exports.handle_request = handle_request;