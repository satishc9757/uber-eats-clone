const Customer = require('../../models/CustomerModel');


async function handle_request(msg, callback){
    const data = msg;

    try {


        Customer.updateOne(
            {_id: data.custId},
            {
                $set: {
                  custFirstName: data.custFirstName,
                  custLastName: data.custLastName,
                  custEmail: data.custEmail,
                  custAbout: data.custAbout,
                  custPhone: data.custPhone,
                  custDob: data.custDob,
                  custNickname: data.custNickname,
                  custAddress: {
                      street: data.custStreet,
                      city: data.custCity,
                      state: data.custState,
                      zipcode: data.custZipcode,
                      country: data.custCountry,
                  }
                //   custImage: data.custImage
                }
            },
            (err, result) => {
                if(err){
                  console.error("updateCust : " + err);
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