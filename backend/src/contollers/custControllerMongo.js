const {uploadFile} = require('../aws/s3/FileUpload')
const { unlinkSync } = require('fs');
const Customer = require('../models/CustomerModel');


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
            // res.cookie('cookie',"customer",{maxAge: 900000, httpOnly: false, path : '/'});
            // res.cookie('custId',result[0].custId,{maxAge: 900000, httpOnly: false, path : '/'});
            // res.cookie('custEmail',result[0].custEmail,{maxAge: 900000, httpOnly: false, path : '/'});
            // res.cookie('custFirstName',result[0].custFirstName,{maxAge: 900000, httpOnly: false, path : '/'});
            // res.cookie('custLastName',result[0].custLastName,{maxAge: 900000, httpOnly: false, path : '/'});
            // res.cookie('custImageLink',result[0].custImageLink,{maxAge: 900000, httpOnly: false, path : '/'});
            // res.cookie('custLocation',result[0].custLocation,{maxAge: 900000, httpOnly: false, path : '/'});
            // req.session.user = {
            // custId: result[0].custId,
            // custEmail: result[0].custEmail,
            // custFirstName: result[0].custFirstName,
            // custLastName: result[0].custLastName,
            // };

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