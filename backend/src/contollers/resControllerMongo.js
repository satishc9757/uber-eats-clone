const {uploadFile} = require('../aws/s3/FileUpload')
const { unlinkSync } = require('fs');
const Restaurant = require('../models/RestaurantModel');


exports.registerRes = function (req, res) {
    const data = req.body;

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
            console.log("Error while saving restaurant data")
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));
        } else {
            res.send({
                resName: data.resName,
                resEmail: data.resEmail,
                resCity: data.resCity,
              });
        }
    });

};


exports.updateRestaurant = async function (req, res) {

    // try{

      const data = req.body;
      const file = req.file;
      console.log("file "+ JSON.stringify(file));
      console.log("data "+ JSON.stringify(data));
      const fileKey = file.destination +"/"+ data.resId +"_"+file.filename;

      const fileUploadRes = await uploadFile(file, fileKey);

      console.log("file uploaded to s3 " +JSON.stringify(fileUploadRes));


      //update by mongo
      Restaurant.updateOne(
          {_id: data.resId},
          {
              $set: {
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
                resDescription: data.resDescription,
                resPhone: data.resPhone,
                resImage: fileUploadRes.Location
              }
          },
          (err, result) => {
              if(err){
                console.error("updateRes : " + err);
                res
                    .status(500)
                    .send(JSON.stringify({ message: "Something went wrong!", err }));
              } else {
                unlinkSync(file.path);
                console.log('successfully deleted after upload');

                res.send(JSON.stringify({ message: "Restaurant updated" }));
              }
          }
          );
      //end


    //   let addressUpdateSql = "UPDATE address SET add_street = ?, add_city = ?, add_state = ?, add_zipcode = ?, add_country = ? "
    //                         +" WHERE add_id = (SELECT res_address_id from restaurants WHERE res_id = ?)"
    //   const addressResult = await con.query(addressUpdateSql, [
    //     data.resStreet,
    //     data.resCity,
    //     data.resState,
    //     data.resZipcode,
    //     data.resCountry,
    //     data.resId
    //   ]);

    //   console.log(addressResult);

    //   let resUpdateSql = "UPDATE restaurants SET res_name = ?, res_email = ?, res_description = ?, res_phone = ?, res_image = ?, res_update_timestamp = now()"
    //                       +" WHERE res_id = ?"

    //   const resResult = await con.query(resUpdateSql, [
    //                           data.resName,
    //                           data.resEmail,
    //                           data.resDescription,
    //                           data.resPhone,
    //                           fileUploadRes.Location,
    //                           data.resId
    //                         ]);

    //   console.log(resResult);

    //   unlinkSync(file.path);
    //   console.log('successfully deleted after upload');

    //   res.send(JSON.stringify({ message: "Restaurant updated" }));
    //   } catch(err){
    //     console.error("updateRes : " + err);
    //     res
    //         .status(500)
    //         .send(JSON.stringify({ message: "Something went wrong!", err }));
    // }


  };


  exports.getRestaurantById = async function(req, res){

    const resId = req.params.id;
    console.log("Inside getRes using mongo id"+resId);

    try{
        let restaurant  = await Restaurant.findById(resId);
            // data = result;

        if(restaurant){
            res.send({
                resId: restaurant._id,
                resName: restaurant.resName,
                resEmail: restaurant.resEmail,
                resStreet: restaurant.resAddress.street,
                resCity: restaurant.resAddress.city,
                resStreet: restaurant.resAddress.street,
                resState: restaurant.resAddress.state,
                resZipcode: restaurant.resAddress.zipcode,
                resImage: restaurant.resImage,
                resDescription: restaurant.resDescription,
                resPhone: restaurant.resPhone,
            });
        } else{
            res.send(restaurant);
        }


    } catch(err){
        console.error("getRestaurantById : " + err);
            res
              .status(500)
              .send(JSON.stringify({ message: "Something went wrong!", err }));
    }

  }

    // let sql = "select res_id as resId, res_name as resName, res_email as resEmail, res_description as resDescription, res_phone as resPhone, add_street as resStreet, add_city as resCity, add_state as resState, add_zipcode as resZipcode, res_delivery_time as resDeliveryTime, res_image as resImage "
    //           +" from restaurants as r, address as a"
    //           +" where r.res_address_id = a.add_id and res_id = ?";

    // con.query(sql, [resId], (err, result) => {
    //   if (err) {
    //     console.error("getRestaurantById : " + err);
    //     res
    //       .status(500)
    //       .send(JSON.stringify({ message: "Something went wrong!", err }));
    //   } else {
    //     console.log(result);
    //     data = result;
    //     res.send(data[0]);
    //   }
    // });

exports.res_login = async function (req, res) {
  const data = req.body;

  console.log(data);
  try{
    const restaurant = await Restaurant.findOne({resEmail: data.resUsername});
    console.log("customer "+restaurant);
    const result = await restaurant.comparePassword(data.resPassword);
    console.log("Result from compare: "+result);

    let restId = restaurant._id.toString();
    console.log("res Id  "+restId);
    if(result){
        console.log("Login successful");
        res.cookie('cookie',"restaurant",{maxAge: 900000, httpOnly: false, path : '/'});
        res.cookie('resId',restId,{maxAge: 900000, httpOnly: false, path : '/'});
        res.cookie('resEmail',restaurant.resEmail,{maxAge: 900000, httpOnly: false, path : '/'});
        res.cookie('resName',restaurant.resName,{maxAge: 900000, httpOnly: false, path : '/'});

        req.session.user = {
          resId: restId,
          resEmail: restaurant.resEmail,
          resName: restaurant.resName,
        };

        //console.log("req session : "+JSON.stringify(req.session.user));
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
        })
        res.end("Successful Login");
    } else {

    }
  } catch(err){

  }

};
