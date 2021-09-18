exports.register_res = function (req, res) {
  const data = req.body;

  console.log(data);
  let sql =
    "INSERT INTO customers (cust_first_name, cust_last_name, cust_email, cust_password) VALUES (?, ?, ?, SHA1(?))";
  con.query(
    sql,
    [
      data.cust_first_name,
      data.cust_last_name,
      data.cust_email,
      data.cust_password,
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

exports.login_res = function (req, res) {
  res.send("Res Login successful!");
};
