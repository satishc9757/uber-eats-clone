var con = require("../database/mysqlConnection");
const util = require('util');

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
    "SELECT COUNT(*) as count FROM customers WHERE cust_email = ? and cust_password = SHA1(?)";
  con.query(sql, [data.custUsername, data.custPassword], (err, result) => {
    if (err) {
      console.error("login_user : " + err);
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
        res.send(JSON.stringify({ user: data.custUsername }));
      }
    }
  });
};


exports.createOrder = async function(req, res) {
  const data = req.body;
  const address = data.deliveryAddress;
  const items = data.cartItems;
  
    let addressSql = "INSERT INTO address (add_street, add_city, add_state, add_zipcode, add_country) VALUES (?, ?, ?, ?, ?)";
    con.query(addressSql, 
      [address.street, address.city, address.state, address.zipcode, address.country], (err, result1) => {
        
        if (err) {
          console.error("createOrder 1 : " + err);
          res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));
        } else {
          console.log(result1);
          let ordersSql = "INSERT INTO orders (order_cust_id, order_restaurant_id, order_address_id, order_delivery_fee, order_service_fee, order_timestamp, order_status) VALUES (?, ?, ?,?, ?, now(), 'Order Placed')";
          
          con.query(ordersSql, 
            [data.custId, data.resId, result1.insertId, data.deliveryFee, data.serviceFee], (err, result2) => {
              if (err) {
                console.error("createOrder 2 : " + err);
                res
                  .status(500)
                  .send(JSON.stringify({ message: "Something went wrong!", err }));
              } else {
                let orderDetailsSql = "INSERT INTO order_details(od_order_id, od_dish_id, od_quantity, od_item_price) VALUES ?";
                console.log("Order items : "+items);
                
                let inputArr = [];
    
                items.forEach(item => inputArr.push([result2.insertId, item.dishId, item.dishQty, item.dishPrice]));
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
          
      
      });

  
    }});
}


