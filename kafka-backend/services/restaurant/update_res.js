const Restaurant = require('../../models/RestaurantModel');

async function handle_request(msg, callback){
    const data = msg;

    try {

        await Restaurant.updateOne(
            {_id: data.resId},
            {
                $set: {
                  resName: data.resName,
                  resEmail: data.resEmail,
                  resAddress: {
                      street: data.resStreet,
                      city: data.resCity,
                      state: data.resState,
                      zipcode: data.resZipcode,
                      country: data.resCountry,
                  },
                  resDescription: data.resDescription,
                  resPhone: data.resPhone,
                  resImage: data.resImage
                }
            },
            (err, result) => {
                if(err){
                  console.error("updateRes : " + err);
                  callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
                } else {
                    callback(null, { response_code: 200,
                        response_data: { message: "Customer updated" }});
                }
            }
            );
    } catch (err) {
        // handle the error
    }

};

exports.handle_request = handle_request;