const Customer = require('../models/CustomerModel');


async function handle_request(msg, callback){

    console.log("Inside cust_login kafka backend");
    console.log(msg);

    // callback(null, {message: "Login Successful"});


    // const data = req.body;

    // console.log(data);

    try{
        const customer = await Customer.findOne({custEmail: msg.custUsername});
        console.log("customer "+customer);
        const result = await customer.comparePassword(msg.custPassword);
        console.log("Result from compare: "+result);
        if(result){
            console.log("Login successful");
            // res.cookie('cookie',"customer",{maxAge: 900000, httpOnly: false, path : '/'});
            // res.cookie('custId',customer.custId,{maxAge: 900000, httpOnly: false, path : '/'});
            // res.cookie('custEmail',customer.custEmail,{maxAge: 900000, httpOnly: false, path : '/'});
            // res.cookie('custFirstName',customer.custFirstName,{maxAge: 900000, httpOnly: false, path : '/'});
            // res.cookie('custLastName',customer.custLastName,{maxAge: 900000, httpOnly: false, path : '/'});
            // res.cookie('custImageLink',customer.custImageLink,{maxAge: 900000, httpOnly: false, path : '/'});
            // res.cookie('custLocation',customer.custLocation,{maxAge: 900000, httpOnly: false, path : '/'});
            // req.session.user = {
            //     custId: customer.custId,
            //     custEmail: customer.custEmail,
            //     custFirstName: customer.custFirstName,
            //     custLastName: customer.custLastName,
            // };

            // console.log("req session : "+JSON.stringify(req.session.user));
            callback(null,customer);

        } else {
            callback(null,{ message: "Invalid login credentials." });
        }
    } catch(err){
        console.log("Err : "+err);
        callback(null,{ message: "Something went wrong!", err });
    }
    console.log("after callback");

};

exports.handle_request = handle_request;