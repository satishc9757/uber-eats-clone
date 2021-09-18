var con = require("../database/mysqlConnection");

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
        res.send(JSON.stringify({ message: "User Registeration done!" }));
      }
    }
  );
};

exports.login_customer = function (req, res) {
  const data = req.body;

  console.log(data);
  let sql =
    "SELECT COUNT(*) as count FROM customers WHERE cust_email = ? and cust_password = SHA1(?)";
  con.query(sql, [data.username, data.password], (err, result) => {
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
      }
      {
        res.send(JSON.stringify({ message: "Login success." }));
      }
    }
  });
};
