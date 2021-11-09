const Customer = require('../../models/CustomerModel');


async function handle_request(msg, callback){
    console.log("Inside validate cust msg : "+msg.custId)
    try{
        const customer = await Customer.findById(msg.custId);
        console.log("customer "+customer);

        if(customer){
            console.log("User exists");
            callback(null, { response_code: 200, response_data: customer});

        } else {
            callback(null, { response_code: 400, response_data: "User does not exist"});
        }
    } catch(err){
        console.log("Err : "+err);
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }
    console.log("after callback");

};

exports.handle_request = handle_request;