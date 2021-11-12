const {uploadFile} = require('../aws/s3/FileUpload')
const { unlinkSync } = require('fs');
const Customer = require('../models/CustomerModel');
var kafka = require('../kafka/client');
const jwt = require('jsonwebtoken');
const { secret } = require('../jwt/config');
const { auth } = require("../jwt/passport");
auth();

exports.registerCustomer = function (req, res) {
    const data = req.body;

    let customer = new Customer({
        custFirstName: data.custFirstName,
        custLastName: data.custLastName,
        custEmail: data.custEmail,
        custPassword: data.custPassword,
    });

    customer.save((err, result) => {
        if(err){
            console.log("Error while saving customer data")
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));
        } else {
            res.send(JSON.stringify({
                custFirstName: data.custFirstName,
                custLastName: data.custLastName,
                custEmail: data.custEmail,
              }));
        }
    });
};


exports.registerCustomerKafka = function (req, res) {
    const data = req.body;

    kafka.make_request('cust_registration',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));

        } else if(results.response_code == 200){

            res.send(JSON.stringify({
                custFirstName: data.custFirstName,
                custLastName: data.custLastName,
                custEmail: data.custEmail,
              }));
        } else {
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));
        }

    });

};

exports.loginCustomer = async function (req, res) {
    const data = req.body;

    console.log(data);

    try{
        const customer = await Customer.findOne({custEmail: data.custUsername});
        console.log("customer "+customer);
        const result = await customer.comparePassword(data.custPassword);
        console.log("Result from compare: "+result);
        if(result){
            console.log("Login successful");
            res.cookie('cookie',"customer",{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('custId',customer.custId,{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('custEmail',customer.custEmail,{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('custFirstName',customer.custFirstName,{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('custLastName',customer.custLastName,{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('custImageLink',customer.custImageLink,{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('custLocation',customer.custLocation,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = {
                custId: customer.custId,
                custEmail: customer.custEmail,
                custFirstName: customer.custFirstName,
                custLastName: customer.custLastName,
            };

            console.log("req session : "+JSON.stringify(req.session.user));
            res.writeHead(200,{
            'Content-Type' : 'text/plain'
            })
            res.end("Successful Login");


        } else {
            res
                .status(400)
                .send(JSON.stringify({ message: "Invalid login credentials." }));

        }
    } catch(err){

    }

  };

exports.loginCustomerKafka = async function (req, res) {
    const data = req.body;

    console.log(data);

    kafka.make_request('cust_login',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        } else if(results.response_code == 200){


            const customer = results.response_data;

            console.log("Login successful");
            res.cookie('cookie',"customer",{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('custId',customer._id,{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('custEmail',customer.custEmail,{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('custFirstName',customer.custFirstName,{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('custLastName',customer.custLastName,{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('custImageLink',customer.custImage,{maxAge: 900000, httpOnly: false, path : '/'});
            res.cookie('custLocation',customer.custAddress.city,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = {
                custId: customer._id,
                custEmail: customer.custEmail,
                custFirstName: customer.custFirstName,
                custLastName: customer.custLastName,
            };

            console.log("Inside else");
                // res.json(
                //     customer
                // );

                // res.end();

                if (customer) {
                    const payload = { _id: customer._id, username: customer.custEmail, userType:"customer"};
                    const token = jwt.sign(payload, secret, {
                        expiresIn: 1008000
                    });
                    res.status(200).end("JWT " + token);
                }
        } else if(results.response_code == 400){
            res
                .status(400)
                .send(JSON.stringify({ message: "Invalid login credentials." }));
        } else {
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));
        }

    });



  };


  exports.customerUpdateKafka = async function (req, res) {
    const data = req.body;
    const file = req.file;

    console.log("file "+ JSON.stringify(file));
    console.log("data "+ JSON.stringify(data));

    const fileKey = file.destination +"/"+ data.custId +"_"+file.filename;

    const fileUploadRes = await uploadFile(file, fileKey);

    console.log("file uploaed to s3 " +JSON.stringify(fileUploadRes));

    kafka.make_request('cust_update',{...data, custImage: fileUploadRes.Location}, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));

        } else if(results.response_code == 200){
            unlinkSync(file.path);
            console.log('successfully deleted after upload');
            res.send(JSON.stringify(results.response_data));
        } else {
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));
        }

    });

};

exports.getCustomerById = async function(req, res){

    const custId = req.params.id;

    kafka.make_request('cust_data',{custId: custId}, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));

        } else if(results.response_code == 200){

            console.log('successfully deleted after upload');
            res.send(JSON.stringify(results.response_data));
        } else {
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));
        }

    });

  };

  exports.createOrder = async function(req, res) {
    const data = req.body;

    console.log("data "+ JSON.stringify(data));

    kafka.make_request('create_order',data, function(err,results){
        console.log(results);
        if (err){
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));

        } else if(results.response_code == 200){
            res.send(JSON.stringify(results.response_data));
        } else {
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));
        }

    });
 }


 exports.getOrdersByCustomer = function(req, res){

    const custId = req.query.custId;

    kafka.make_request('cust_orders',{custId: custId}, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));

        } else if(results.response_code == 200){

            res.send(JSON.stringify(results.response_data));
        } else {
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));
        }

    });

 };

  exports.getOrderDetailsByOrderId = function(req, res){

    const orderId = req.query.orderId;

    kafka.make_request('order_details',{orderId: orderId}, function(err,results){
        console.log(results);
        if (err){
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));

        } else if(results.response_code == 200){

            res.send(JSON.stringify(results.response_data));
        } else {
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));
        }

    });

  };


  exports.cancelOrder = function (req, res) {
    const data = req.body;

    kafka.make_request('cancel_order',{orderId: data.orderId}, function(err,results){
        console.log(results);
        if (err){
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));

        } else if(results.response_code == 200){

            res.send(JSON.stringify(results.response_data));
        } else {
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));
        }

    });

  };


exports.getDeliveryAddressesForUser = function(req, res){

    const custId = req.query.custId;

    kafka.make_request('cust_delivery_address',{custId: custId}, function(err,results){
        console.log(results);
        if (err){
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));

        } else if(results.response_code == 200){

            res.send(JSON.stringify(results.response_data));
        } else {
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));
        }

    });

 };


 exports.addFavoriteRes = function (req, res) {
    const data = req.body;

    kafka.make_request('cust_favs', data, function(err,results){
        if (err){
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));

        } else if(results.response_code == 200){
            res.send(JSON.stringify(results.response_data));
        } else {
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));
        }

    });

  };