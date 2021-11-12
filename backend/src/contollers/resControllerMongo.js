const {uploadFile} = require('../aws/s3/FileUpload')
const { unlinkSync } = require('fs');
const Restaurant = require('../models/RestaurantModel');
const Dish = require('../models/DishModel');
var kafka = require('../kafka/client');
const jwt = require('jsonwebtoken');
const { secret } = require('../jwt/config');
// const { authRes } = require("../jwt/res_passport");
// authRes();

exports.registerRes = function (req, res) {
    const data = req.body;

    kafka.make_request('res_registration',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          res
          .status(500)
          .send(JSON.stringify({ message: "Something went wrong!", err }));

      } else if(results.response_code == 200){
          res.send(results.response_data);
      } else {
          res
          .status(500)
          .send(JSON.stringify({ message: "Something went wrong!", err }));
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

      kafka.make_request('update_res',{...data, resImage: fileUploadRes.Location}, function(err,results){
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
      //update by mongo

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

  kafka.make_request('res_data',{resId: resId}, function(err,results){
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

exports.res_login = async function (req, res) {
  const data = req.body;

  kafka.make_request('res_login',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    } else if(results.response_code == 200){
        const restaurant = results.response_data;
        console.log("Login successful");
        res.cookie('cookie',"restaurant",{maxAge: 900000, httpOnly: false, path : '/'});
        res.cookie('resId',restaurant._id,{maxAge: 900000, httpOnly: false, path : '/'});
        res.cookie('resEmail',restaurant.resEmail,{maxAge: 900000, httpOnly: false, path : '/'});
        res.cookie('resName',restaurant.resName,{maxAge: 900000, httpOnly: false, path : '/'});

        req.session.user = {
          resId: restaurant._id,
          resEmail: restaurant.resEmail,
          resName: restaurant.resName,
        };

        //console.log("req session : "+JSON.stringify(req.session.user));
        if (restaurant) {
          const payload = { _id: restaurant._id, username: restaurant.resEmail, userType:"restaurant"};
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

exports.addDish = async function (req, res) {
  const data = req.body;
  const file = req.file;
  console.log("file "+ JSON.stringify(file));

  let dish = new Dish({
    dishName: data.dishName,
    dishResId: data.resId,
    dishMainIngredients: data.dishMainIngredients,
    dishImage: file.originalname,
    dishPrice: data.dishPrice,
    dishDesc: data.dishDesc,
    dishCategory: data.dishCategory,
    dishType: data.dishType,
  });

dish.save(async (err, result) => {
    if(err){
        console.log("Error while saving dish data")
        res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!", err }));
    } else {
      console.log("Result data : "+JSON.stringify(result));
      const fileKey = file.destination +"/"+ result._id +"_"+file.filename;
      const fileUploadRes = await uploadFile(file, fileKey);
      console.log("file uploaded to s3 " +JSON.stringify(fileUploadRes));
      console.log("The result is : "+  JSON.stringify(result));
      dish.updateOne({
        $set: {
          dishImage: fileUploadRes.Location,
        }
      }, (err, result) => {
        if (err) {
          console.error("add_dish : " + err);
          res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));
        } else {
          res.send(JSON.stringify({ message: "Dish added successfully." }));
        }
      });
    }
});

  //res.send(JSON.stringify({ message: "Dish added successfully." }));
};


exports.addDishKafka = async function (req, res) {
  const data = req.body;
  const file = req.file;
  console.log("file "+ JSON.stringify(file));


  kafka.make_request('create_dish', data, async function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!", err }));

    } else if(results.response_code == 200){
        const result = results.response_data;
        console.log("Result data : "+JSON.stringify(result));
        const fileKey = file.destination +"/"+ result._id +"_"+file.filename;
        const fileUploadRes = await uploadFile(file, fileKey);
        console.log("file uploaded to s3 " +JSON.stringify(fileUploadRes));
        console.log("The result is : "+  JSON.stringify(result));
        result["dishImage"] = fileUploadRes.Location;
        kafka.make_request('dish_image_update',result, async function(error,updateResults){
          if (error){
              res
              .status(500)
              .send(JSON.stringify({ message: "Something went wrong!", err }));

          } else if(updateResults.response_code == 200){
              res.send(JSON.stringify({ message: "Dish added successfully." }));
          } else {
              res
                .status(500)
                .send(JSON.stringify({ message: "Something went wrong!", err }));
          }
        });

    } else {
        res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!", err }));
    }

  });

};


exports.updateDish = function (req, res) {
  const data = req.body;

  kafka.make_request('dish_update', data, function(err,results){
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
}

exports.getDishByRes =  function(req, res){
  const resId = req.params.resId;

  kafka.make_request('dish_data',{resId: resId}, function(err,results){
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

exports.getDish =  async function(req, res){
  const dishId = req.params.id;

    kafka.make_request('dish_data_by_id',{dishId: dishId}, function(err,results){
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


exports.getOrdersByRes = function(req, res){

  const resId = req.query.resId;


    kafka.make_request('res_orders',{resId: resId}, function(err,results){
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

exports.updateOrderStatus = function (req, res) {
  const data = req.body;

  kafka.make_request('order_status_update', data, function(err,results){
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

exports.getRestaurantByQueryString = function(req, res){
  const searchText = req.query.searchText;
  kafka.make_request('res_search',{searchText: searchText}, function(err,results){
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
}

exports.getFavRestaurantsByCustId = function(req, res){
  const custId = req.query.custId;

  kafka.make_request('cust_fav_res_data',{custId: custId}, function(err,results){
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
}
