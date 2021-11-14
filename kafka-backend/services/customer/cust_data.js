const Customer = require('../../models/CustomerModel');


async function handle_request(msg, callback){
    const custId = msg.custId;

    try{
        let customer  = await Customer.findById(custId);
            // data = result;

        if(customer){
            callback(null, { response_code: 200, response_data: {
                custId: customer._id,
                custFirstName: customer.custFirstName,
                custLastName: customer.custLastName,
                custEmail: customer.custEmail,
                custStreet: customer.custAddress ? customer.custAddress.street : null,
                custCity: customer.custAddress ? customer.custAddress.city : null,
                custStreet: customer.custAddress ? customer.custAddress.street : null,
                custState: customer.custAddress ? customer.custAddress.state : null,
                custZipcode: customer.custAddress ? customer.custAddress.zipcode : null,
                custCountry: customer.custAddress ? customer.custAddress.country : null,
                custImage: customer.custImage,
                custPhone: customer.custPhone,
                custAbout: customer.custAbout,
                custNickname: customer.custNickname,
                custDob: customer.custDob
            }});
        } else{
            callback(null, { response_code: 200, response_data: {}});
        }

    } catch(err){
        console.error("getCustomerById request : " + err);
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }

};

exports.handle_request = handle_request;