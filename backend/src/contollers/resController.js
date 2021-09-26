
var con = require("../database/mysqlConnection");


exports.register_res = function (req, res) {
  const data = req.body;

  let addressSql = "INSERT INTO address (add_street, add_city, add_state, add_zipcode, add_country) VALUES (?, ?, ?, ?, ?)"

  con.query(
    addressSql,
    [
      data.resStreet,
      data.resCity,
      data.resState,
      data.resZipcode,
      data.resCountry
    ],
    (err, addressResult) => {
      if (err) {
        console.error("register_user : " + err);
        res
          .status(500)
          .send(JSON.stringify({ message: "Something went wrong!", err }));
      } else {
        console.log("address inserted "+addressResult);
        let sql =
        "INSERT INTO restaurants (res_name, res_email, res_password, res_address_id, res_create_timestamp, res_update_timestamp) VALUES (?, ?, SHA1(?), ?, now(), now())";
        con.query(
          sql,
          [
            data.resName,
            data.resEmail,
            data.resPassword,
            addressResult.insertId
          ],
          (err, result) => {
            if (err) {
              console.error("register_res : " + err);
              res
                .status(500)
                .send(JSON.stringify({ message: "Something went wrong!", err }));
            } else {
              console.log(result);
              res.send(JSON.stringify({ message: "Restaurant Registeration done!" }));
            }
          }
        );
      }
    }
  );

};

exports.res_login = function (req, res) {
  const data = req.body;

  console.log(data);
  let sql =
    "SELECT COUNT(*) as count FROM restaurants WHERE res_email = ? and res_password = SHA1(?)";
  con.query(sql, [data.resUsername, data.resPassword], (err, result) => {
    if (err) {
      console.error("res_login : " + err);
      res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!", err }));
    } else {
      console.log(result);
      if (result[0].count == 0) {
        res
          .status(400)
          .send(JSON.stringify({ message: "Invalid login credentials." }));
      } else {
        res.send(JSON.stringify({ message: "Login success." }));
      }
    }
  });
};


exports.addDish = function (req, res) {
  const data = req.body;
  const file = req.file;
  console.log("file "+ JSON.stringify(file));
  console.log("dishName : "+ data.dishName);
  let addressSql = "INSERT INTO dishes (dish_res_id, dish_name, dish_main_ingredients, dish_image_link, dish_price, dish_desc, dish_category, dish_type, dish_create_timestamp, dish_update_timestamp) " 
                   + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, now(), now())"
                   
  // con.query(
  //   addressSql,
  //   [
  //     data.resId,
  //     data.dishName,
  //     data.dishMainIngredients,
  //     data.dishImageLink,
  //     data.dishPrice,
  //     data.dishDesc,
  //     data.dishCategory,
  //     data.dishType
  //   ],
  //   (err, result) => {
  //     if (err) {
  //       console.error("add_dish : " + err);
  //       res
  //         .status(500)
  //         .send(JSON.stringify({ message: "Something went wrong!", err }));
  //     } else {
  //       console.log("address inserted "+result);
  //       res.send(JSON.stringify({ message: "Dish added successfully." }));
  //     }
  //   }
  // );
  res.send(JSON.stringify({ message: "Dish added successfully." }));
};

exports.updateDish = function (req, res) {
  const data = req.body;
  const file = req.file;
  console.log("file "+ JSON.stringify(file));
  console.log("dishName : "+ data.dishName);
  let sql = "UPDATE dishes SET dish_name = ?, dish_main_ingredients = ? , dish_image_link = ?, dish_price = ?, dish_desc = ?, dish_category = ?, dish_type = ?, dish_update_timestamp = now() " 
                   + " WHERE dish_id = ?"

  con.query(
    sql,
    [
      data.dishName,
      data.dishMainIngredients,
      data.dishImageLink,
      data.dishPrice,
      data.dishDesc,
      data.dishCategory,
      data.dishType,
      data.dishId
    ],
    (err, result) => {
      if (err) {
        console.error("updateDish : " + err);
        res
          .status(500)
          .send(JSON.stringify({ message: "Something went wrong!", err }));
      } else {
        //console.log("address inserted "+result);
        res.send(JSON.stringify({ data: data }));
      }
    }
  );
  
};

exports.getAllDishes =  function(req, res){
  let sql = "select * from dishes";
  
  con.query(sql, (err, result) => {
    if (err) {
      console.error("getAllDishes : " + err);
      res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!", err }));
    } else {
      console.log(result);
      data = result;
      
      res.send(JSON.stringify({ data: result }));
    }
  }); 

};



exports.getDish =  function(req, res){
  const dishId = req.params.id;  
  
  let sql = "select * from dishes where dish_id = ?";
  
  con.query(sql, [dishId], (err, result) => {
    if (err) {
      console.error("getDish : " + err);
      res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!", err }));
    } else {
      console.log(result);
      data = result;
      
      res.send(JSON.stringify({ data: result }));
    }
  }); 

};


exports.deleteDish =  function(req, res){
  const dishId = req.body.dishId;  
  
  let sql = "DELETE FROM dishes WHERE dish_id = ?";
  
  con.query(sql, [dishId], (err, result) => {
    if (err) {
      console.error("deleteDish : " + err);
      res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!", err }));
    } else {
      console.log(result);
      data = result;
      
      res.send(JSON.stringify({ message: "Dish deleted successfully!" }));
    }
  }); 

};