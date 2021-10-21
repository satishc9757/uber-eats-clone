var con = require("../database/mysqlConnection");
const util = require('util');
const {uploadFile} = require('../aws/s3/FileUpload')
const { unlinkSync } = require('fs');

exports.register_customer = function (req, res) {
  const data = req.body;

  console.log(data);
  let sql =
    "INSERT INTO customers (cust_first_name, cust_last_name, cust_email, cust_password) VALUES (?, ?, ?, SHA1(?))";
  con.query(
    sql,
    [
      data.custFirstName,
      data.custLastName,
      data.custEmail,
      data.custPassword,
    ],
    (err, result) => {
      if (err) {
        console.error("register_user : " + err);
        res
          .status(500)
          .send(JSON.stringify({ message: "Something went wrong!", err }));
      } else {
        console.log(result);
        res.send(JSON.stringify({
          custFirstName: data.custFirstName,
          custLastName: data.custLastName,
          custEmail: data.custEmail,
        }));
      }
    }
  );
};

exports.login_customer = function (req, res) {
  const data = req.body;

  console.log(data);
  let sql =
    // "SELECT COUNT(*) as count FROM customers WHERE cust_email = ? and cust_password = SHA1(?)";
    "SELECT cust_id as custId, cust_email as custEmail, cust_first_name as custFirstName, cust_last_name as custLastName, cust_profile_image_link as custImageLink, IFNULL(add_city,'') as custLocation "
      +" from customers as c left join address as a on c.cust_address_id = a.add_id WHERE  cust_email = ? and cust_password = SHA1(?)"
  con.query(sql, [data.custUsername, data.custPassword], (err, result) => {
    if (err) {
      console.error("login_user : " + err);
      res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!", err }));
    } else {
      console.log(result);
      // if (result[0].count == 0) {
      if (result.length == 0) {
        console.log("Login failed");
        res
          .status(400)
          .send(JSON.stringify({ message: "Invalid login credentials." }));
      } else {
        console.log("Login successful");
        res.cookie('cookie',"customer",{maxAge: 900000, httpOnly: false, path : '/'});
        // res.cookie('customer', {
        //   custId: result[0].custId,
        //   custEmail: result[0].custEmail,
        //   custFirstName: result[0].custFirstName,
        //   custLastName: result[0].custLastName,
        // },{maxAge: 900000, httpOnly: false, path : '/'});
        res.cookie('custId',result[0].custId,{maxAge: 900000, httpOnly: false, path : '/'});
        res.cookie('custEmail',result[0].custEmail,{maxAge: 900000, httpOnly: false, path : '/'});
        res.cookie('custFirstName',result[0].custFirstName,{maxAge: 900000, httpOnly: false, path : '/'});
        res.cookie('custLastName',result[0].custLastName,{maxAge: 900000, httpOnly: false, path : '/'});
        res.cookie('custImageLink',result[0].custImageLink,{maxAge: 900000, httpOnly: false, path : '/'});
        res.cookie('custLocation',result[0].custLocation,{maxAge: 900000, httpOnly: false, path : '/'});
        req.session.user = {
          custId: result[0].custId,
          custEmail: result[0].custEmail,
          custFirstName: result[0].custFirstName,
          custLastName: result[0].custLastName,
        };

        console.log("req session : "+JSON.stringify(req.session.user));
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
        })
        res.end("Successful Login");
      }
    }
  });
};


exports.logout = function(req, res) {
  res.cookie('cookie', 'none', {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  })
  res
    .status(200)
    .json({ success: true, message: 'User logged out successfully' })
  };

exports.createOrder = async function(req, res) {
  const data = req.body;
  const address = data.deliveryAddress;
  const items = data.cartItems;
  console.log("add_id "+address.add_id);
  if(address.add_id === null || address.add_id === ''){
    let addressSql = "INSERT INTO address (add_street, add_city, add_state, add_zipcode, add_country) VALUES (?, ?, ?, ?, ?)";
    con.query(addressSql,
      [address.street, address.city, address.state, address.zipcode, address.country], (err, result1) => {

        if (err) {
          console.error("createOrder 1 : " + err);
          res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));
        } else {
      //     console.log(result1);
      //     let ordersSql = "INSERT INTO orders (order_cust_id, order_restaurant_id, order_address_id, order_delivery_fee, order_service_fee, order_timestamp, order_status) VALUES (?, ?, ?,?, ?, now(), 'Order Placed')";

      //     con.query(ordersSql,
      //       [data.custId, data.resId, result1.insertId, data.deliveryFee, data.serviceFee], (err, result2) => {
      //         if (err) {
      //           console.error("createOrder 2 : " + err);
      //           res
      //             .status(500)
      //             .send(JSON.stringify({ message: "Something went wrong!", err }));
      //         } else {
      //           let orderDetailsSql = "INSERT INTO order_details(od_order_id, od_dish_id, od_quantity, od_item_price) VALUES ?";
      //           console.log("Order items : "+items);

      //           let inputArr = [];

      //           items.forEach(item => inputArr.push([result2.insertId, item.dishId, item.dishQty, item.dishPrice]));
      //           console.log("input arr: "+inputArr);
      //           con.query(orderDetailsSql, [inputArr], (err, result3) => {
      //             if (err) {
      //               console.error("createOrder 3 : " + err);
      //               res
      //                 .status(500)
      //                 .send(JSON.stringify({ message: "Something went wrong!", err }));
      //             } else {
      //               res.send(JSON.stringify({ message: "Order Placed successfully", err }));
      //             }
      //         });
      //       }


      // });
            return insertOrder(req, res, result1.insertId);

    }});
  } else {
      console.log("Address skipped!")
      return insertOrder(req, res, address.add_id);
  }

}

exports.cancelOrder = function (req, res) {
  const data = req.body;

  let sql = "UPDATE orders SET order_status = 'Cancelled' "
                   + " WHERE order_id = ?"

  con.query(
    sql,
    [
      data.orderId,
    ],
    (err, result) => {
      if (err) {
        console.error("updateOrderStatus : " + err);
        res
          .status(500)
          .send(JSON.stringify({ message: "Something went wrong!", err }));
      } else {
        //console.log("address inserted "+result);
        res.send("Order Cancelled successfully");
      }
    }
  );

};



insertOrder = function(req, res, addId){
  const data = req.body;
  //console.log(result1);
  let ordersSql = "INSERT INTO orders (order_cust_id, order_restaurant_id, order_address_id, order_delivery_fee, order_service_fee, order_timestamp, order_status, order_total) VALUES (?, ?, ?,?, ?, now(), 'Order Placed', ?)";

  con.query(ordersSql,
    [data.custId, data.resId, addId, data.deliveryFee, data.serviceFee, data.cartTotal], (err, result2) => {
      if (err) {
        console.error("insertOrder : " + err);
        res
          .status(500)
          .send(JSON.stringify({ message: "Something went wrong!", err }));
      } else {
        return insertOrderDetails(req, res, result2.insertId);
    }


});
}


insertOrderDetails = function(req, res, orderId){
  const data = req.body;
  const items = data.cartItems;
  let orderDetailsSql = "INSERT INTO order_details(od_order_id, od_dish_id, od_quantity, od_item_price) VALUES ?";
        console.log("Order items : "+items);

        let inputArr = [];

        items.forEach(item => inputArr.push([orderId, item.dishId, item.dishQuantity, item.dishPrice]));
        console.log("input arr: "+inputArr);
        con.query(orderDetailsSql, [inputArr], (err, result3) => {
          if (err) {
            console.error("createOrder 3 : " + err);
            res
              .status(500)
              .send(JSON.stringify({ message: "Something went wrong!", err }));
          } else {
            res.send(JSON.stringify({ message: "Order Placed successfully", err }));
          }
      });
}

exports.getCustomerById = async function(req, res){

  const custId = req.params.id;

  let sql = "select cust_id as custId, cust_first_name as custFirstName, cust_last_name as custLastName, cust_email as custEmail, cust_phone as custPhone, cust_dob as custDob, IFNULL(cust_nickname, '') as custNickname, cust_about as custAbout, cust_profile_image_link as custImage, add_street as custStreet, add_city as custCity, add_state as custState, add_zipcode as custZipcode, add_country as custCountry, add_id as custAddId "
            +" from customers as c LEFT JOIN address as a ON c.cust_address_id = a.add_id"
            +" where c.cust_id = ? ";

  con.query(sql, [custId], (err, result) => {
    if (err) {
      console.error("getCustomerById : " + err);
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

exports.getOrdersByCustomer = function(req, res){

  const custId = req.query.custId;

  let sql = "select o.order_id as orderId, o.order_total as orderTotal, r.res_name as resName, a.add_street as street, a.add_city as city, a.add_state as state, a.add_zipcode as zipcode,"
            +" DATE_FORMAT(order_timestamp, '%Y-%m-%d %H:%i:%s') as orderTimestamp, order_status as orderStatus, order_delivery_fee as orderDeliveryFee, order_service_fee as orderServiceFee "
            +" from orders as o, restaurants as r, address as a "
            +" where o.order_restaurant_id = r.res_id "
            +" and o.order_address_id = a.add_id "
            +" and o.order_cust_id = ? "

  con.query(sql, [custId], (err, result) => {
    if (err) {
      console.error("getOrdersByCustomer : " + err);
      res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!", err }));
    } else {
        console.log("orders fetched : "+result);
        res.send(result);
    }
  });

};

exports.getOrderDetailsByOrderId = function(req, res){

  const orderId = req.query.orderId;

  let sql = "select o.od_id as odId, d.dish_name as dishName, o.od_quantity as odQuantity, o.od_item_price as odPrice"
            +" from order_details as o, dishes as d"
            +" where o.od_dish_id = d.dish_id"
            +" and o.od_order_id = ? "

  con.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error("getOrderDetailsByOrderId : " + err);
      res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!", err }));
    } else {
        console.log(result);
        res.send(result);
    }
  });

};

exports.getDeliveryAddressesForUser = function(req, res){

  const custId = req.query.custId;

  let sql = "select a.add_id, a.add_street as street, a.add_city as city, a.add_state as state, a.add_zipcode as zipcode, a.add_country as country"
            +" from address as a "
            +" where a.add_id in (select distinct order_address_id "
            +" from orders as o "
            +" where o.order_cust_id = ?)";

  con.query(sql, [custId], (err, result) => {
    if (err) {
      console.error("getRestaurantById : " + err);
      res
        .status(500)
        .send(JSON.stringify({ message: "Something went wrong!", err }));
    } else {
        console.log(result);
        res.send(result);
    }
  });

};

exports.updateCustomerProfile = async function (req, res) {
  const data = req.body;
  const file = req.file;

  console.log("file "+ JSON.stringify(file));
  console.log("data "+ JSON.stringify(data));

  const fileKey = file.destination +"/"+ data.custId +"_"+file.filename;

  const fileUploadRes = await uploadFile(file, fileKey);

  console.log("file uploaed to s3 " +JSON.stringify(fileUploadRes));

  try {
    unlinkSync(file.path);
    console.log('successfully deleted /tmp/hello');
  } catch (err) {
    // handle the error
  }

    let addId = data.custAddId;
    console.log("Address id : "+addId);
    if(data.custAddId == null || data.custAddId === '' || data.custAddId == 'null'){
      let addressSql = "INSERT INTO address (add_street, add_city, add_state, add_zipcode, add_country) VALUES (?, ?, ?, ?, ?)"
      const addressInsertRes =  con.query(addressSql, [
        data.custStreet,
        data.custCity,
        data.custState,
        data.custZipcode,
        data.custCountry
      ],
      (err, result) => {
        if (err) {
          console.error("register_user : " + err);
          res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));
        } else {
          console.log(result);
          updateCustData(req, res, result.insertId, fileUploadRes.Location);
        }
      });


    } else {
      let addressUpdateSql = "UPDATE address SET add_street = ?, add_city = ?, add_state = ?, add_zipcode = ?, add_country = ? "
      +" WHERE add_id = ?"
      const addressResult = con.query(addressUpdateSql, [
        data.custStreet,
        data.custCity,
        data.custState,
        data.custZipcode,
        data.custCountry,
        data.addId
      ],
      (err, result) => {
        if (err) {
          console.error("register_user : " + err);
          res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));
        } else {
          console.log(result);
          updateCustData(req, res, data.addId, fileUploadRes.Location);
        }
      });

    }

    // let custUpdateSql = "UPDATE customers SET cust_first_name = ?, cust_last_name = ?, cust_email = ?, cust_about = ?, cust_phone = ?, cust_dob = ?, cust_nickname = ?, cust_profile_image_link = ?, cust_address_id = ?, cust_update_timestamp = now()"
    //                     +" WHERE cust_id = ?"

    // const resResult = await con.query(custUpdateSql, [
    //                         data.custFirstName,
    //                         data.custLastName,
    //                         data.custEmail,
    //                         data.custAbout,
    //                         data.custPhone,
    //                         data.custDob,
    //                         data.custNickname,
    //                         data.custId+"_"+file.originalname,
    //                         addId,
    //                         data.custId
    //                       ]);

    // console.log(resResult);
    // res.send(JSON.stringify({ message: "Customer updated" }));




};


updateCustData = async function(req, res, addId, imageLink){
  const file = req.file;
  const data = req.body;
  let custUpdateSql = "UPDATE customers SET cust_first_name = ?, cust_last_name = ?, cust_email = ?, cust_about = ?, cust_phone = ?, cust_dob = ?, cust_nickname = ?, cust_profile_image_link = ?, cust_address_id = ?, cust_update_timestamp = now()"
                        +" WHERE cust_id = ?"

    const resResult = await asyncQuery(custUpdateSql, [
                            data.custFirstName,
                            data.custLastName,
                            data.custEmail,
                            data.custAbout,
                            data.custPhone,
                            data.custDob,
                            data.custNickname,
                            imageLink,
                            addId,
                            data.custId
                          ]);

    console.log(resResult);
    res.send(JSON.stringify({ message: "Customer updated" }));
}

exports.addFavoriteRes = function (req, res) {
  const data = req.body;

  let sql = "INSERT into favorites(fav_res_id, fav_cust_id) values(?, ?)"

  con.query(
    sql,
    [
      data.resId,
      data.custId,
    ],
    (err, result) => {
      if (err) {
        console.error("addFavoriteRes : " + err);
        res
          .status(500)
          .send(JSON.stringify({ message: "Something went wrong!", err }));
      } else {
        //console.log("address inserted "+result);
        res.send("Favorite added successfully");
      }
    }
  );

};


function asyncQuery(query, params) {
  return new Promise((resolve, reject) =>{
      con.query(query, params, (err, result) => {
          if (err)
              return reject(err);
          resolve(result);
      });
  });

}