const {check, validationResult} = require('express-validator');
var con = require('../database/mysqlConnection');

exports.validateUserLogin = [
  check('username')
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .bail()
    .withMessage('Invalid email address!')
    .custom(async username => {
        console.log("custom : "+username);
        const isUsernameInUse = await isUsernamePresent(username);
        console.log("isUsernameInUse : "+isUsernameInUse);
        if(!isUsernameInUse){
          throw new Error('Username does not exist.');
        }
    }),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Password cannot be empty')
    .custom(async pass => {
        console.log("pass: "+pass)
    })
    .bail(),  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({errors: errors.array()});
    next();
  },
];


function isUsernamePresent(username){
  
  return new Promise((resolve, reject) => {
      con.query('SELECT COUNT(*) AS count FROM customers WHERE cust_email = ?', [username], function (error, results, fields) {
          if(!error){
              console.log("Username count : "+results[0].count);
              return resolve(results[0].count > 0);
          } else {
              return reject(new Error('Database error!!'));
          }
        }
      );
  });
}
