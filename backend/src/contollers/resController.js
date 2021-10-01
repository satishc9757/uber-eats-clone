
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

exports.updateRestaurant = async function (req, res) {
  const data = req.body;
  const files = req.files;
  console.log("file "+ JSON.stringify(files));
  console.log("data "+ JSON.stringify(data));
  //console.log("dishName : "+ data.dishName);
  
  try{
    let addressUpdateSql = "UPDATE address SET add_street = ?, add_city = ?, add_state = ?, add_zipcode = ?, add_country = ? "
                          +" WHERE add_id = (SELECT res_address_id from restaurants WHERE res_id = ?)"
    const addressResult = await con.query(addressUpdateSql, [
      data.resStreet,
      data.resCity,
      data.resState,
      data.resZipcode,
      data.resCountry,
      data.resId
    ]);

    console.log(addressResult);

    let resUpdateSql = "UPDATE restaurants SET res_name = ?, res_email = ?, res_password = SHA1(?), res_description = ?, res_phone = ?, res_update_timestamp = now()"
                        +" WHERE res_id = ?"

    const resResult = await con.query(resUpdateSql, [
                            data.resName,
                            data.resEmail,
                            data.resPassword,
                            data.resDescription,
                            data.resPhone,
                            data.resId
                          ]);

    console.log(resResult); 

    const delQuery = "DELETE FROM res_images WHERE img_res_id = ?";                      
    const delRes = await con.query(delQuery, [data.resId]);
    console.log("after delete " +delRes); 

    const insertImgQuery = "INSERT INTO res_images(img_res_id, img_name, img_link) VALUES ? "
    console.log("files : "+files);
    const inputArr = []
    //files.map(file => [[data.resId, file.originalname, file.originalname]]);
    files.forEach(file => inputArr.push([data.resId, file.originalname, file.originalname]));
    console.log("input arr: "+inputArr);
    const imageInsertRes = await con.query(insertImgQuery, [inputArr]);

    console.log("after image insert "+imageInsertRes);                        
  } catch(err){
      console.error("updateRes : " + err);
      res
          .status(500)
          .send(JSON.stringify({ message: "Something went wrong!", err }));
  }
  res.send(JSON.stringify({ message: "User updated" }));
  
};


exports.getRestaurantById = function(req, res){
  
  const resId = req.params.id;  
  
  let sql = "select res_id as resId, res_name as resName, res_email as resEmail, res_description as resDescription, res_phone as resPhone, add_street as resStreet, add_city as resCity, add_state as resState, add_zipcode as resZipcode "
            +" from restaurants as r, address as a" 
            +" where r.res_address_id = a.add_id and res_id = ?";
  
  con.query(sql, [resId], (err, result) => {
    if (err) {
      console.error("getRestaurantById : " + err);
      res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!", err }));
    } else {
      console.log(result);
      data = result;
      res.send(JSON.stringify(result));
    }
  }); 

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

  con.query(
    addressSql,
    [
      data.resId,
      data.dishName,
      data.dishMainIngredients,
      file.originalname,
      data.dishPrice,
      data.dishDesc,
      data.dishCategory,
      data.dishType
    ],
    (err, result) => {
      if (err) {
        console.error("add_dish : " + err);
        res
          .status(500)
          .send(JSON.stringify({ message: "Something went wrong!", err }));
      } else {
        console.log("address inserted "+result);
        res.send(JSON.stringify({ message: "Dish added successfully." }));
      }
    }
  );
  //res.send(JSON.stringify({ message: "Dish added successfully." }));
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
  let sql = "select dish_id as dishId, dish_res_id as dishResId, dish_name as dishName, dish_main_ingredients as dishMainIngredients, dish_image_link as dishImage, dish_price as dishPrice, dish_desc as dishDesc, dish_category as dishCategory, dish_type as dishType  from dishes";
  console.log("In am here in the get all dishes")
  con.query(sql, (err, result) => {
    if (err) {
      console.error("getAllDishes : " + err);
      res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!", err }));
    } else {
      console.log(result);
      data = result;
      
      res.send(JSON.stringify({ dishes: result }));
    }
  }); 

};

exports.getDish =  function(req, res){
  const dishId = req.params.id;  
  console.log("In am here in the get dishes")
  let sql = "select dish_id as dishId, dish_res_id as dishResId, dish_name as dishName, dish_main_ingredients as dishMainIngredients, dish_image_link as dishImage, dish_price as dishPrice, dish_desc as dishDesc, dish_category as dishCategory, dish_type as dishType  from dishes where dish_id = ?";
  
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