var mysql = require('mysql');

var con = mysql.createConnection({
  host: "uber-eats-db.cr20lz1z2tqr.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "Sklt#2021",
  database: "uber-eats"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;