const Customer = require('../../models/CustomerModel');


async function handle_request(msg, callback){
    const data = msg;

    let customer = new Customer({
        custFirstName: data.custFirstName,
        custLastName: data.custLastName,
        custEmail: data.custEmail,
        custPassword: data.custPassword,
    });

    customer.save((err, result) => {
        if(err){
            console.log("Error while saving customer data")
            callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
        } else {

            callback(null, { response_code: 200,
                response_data: {
                    custFirstName: data.custFirstName,
                    custLastName: data.custLastName,
                    custEmail: data.custEmail,
              }});
        }
    });

};

exports.handle_request = handle_request;