const {check, validationResult} = require('express-validator');
var con = require('../database/mysqlConnection');

exports.validateCustLogin = [
  check('custUsername')
    .not()
    .isEmpty()
    .trim()
    .bail()
    .withMessage('Invalid email address!')
    .custom(async username => {
        const isUsernameInUse = await isUsernamePresent(username);
        if(!isUsernameInUse){
          throw new Error('Username does not exist.');
        }
    })
    .withMessage('Username does not exist.')
    .bail(),
  check('custPassword')
    .not()
    .isEmpty()
    .withMessage('Password cannot be empty')
    .bail(),  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({errors: errors.array()});
    next();
  },
];

exports.validateCustRegistration = [
  check('custFirstName')
    .not()
    .isEmpty()
    .withMessage('First name cannot be empty.')
    .trim()
    .matches(/^[a-zA-Z ,.'-]+$/)
    .withMessage('Invalid first name.')
    .bail(),
  check('custLastName')
    .not()
    .isEmpty()
    .withMessage('Last name cannot be empty.')
    .trim()
    .matches(/^[a-zA-Z ,.'-]+$/)
    .withMessage('Invalid last name.')
    .bail(),  
  check('custEmail')
    .not()
    .isEmpty()
    .withMessage('Email cannot be empty.')
    .trim()
    .isEmail()
    .withMessage('Invalid email address!')
    .bail()
    .normalizeEmail()
    .custom(async username => {
        const isUsernameInUse = await isUsernamePresent(username);
        console.log("Resposne from username validation is : "+isUsernameInUse);
        if(isUsernameInUse){
          throw new Error('Email already exists.');
        }
    })
    .withMessage('Email already exists.')
    .bail(),
  check('custPassword')
    .not()
    .isEmpty()
    .withMessage('Password cannot be empty')
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
