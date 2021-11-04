const Customer = require('../../models/CustomerModel');


async function handle_request(msg, callback){

    try{
        const customer = await Customer.findOne({custEmail: msg.custUsername});
        console.log("customer "+customer);
        const result = await customer.comparePassword(msg.custPassword);
        console.log("Result from compare: "+result);
        if(result){
            console.log("Login successful");
            callback(null, { response_code: 200, response_data: customer});

        } else {
            callback(null, { response_code: 400, response_data: "Invalid login credentials."});
        }
    } catch(err){
        console.log("Err : "+err);
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }
    console.log("after callback");

};

exports.handle_request = handle_request;