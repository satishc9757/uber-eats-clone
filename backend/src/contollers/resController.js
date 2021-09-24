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


exports.add_dish = function (req, res) {
  const data = req.body;
  console.log("add_dish "+ req.body);
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

