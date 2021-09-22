const {check, validationResult} = require('express-validator');
var con = require('../database/mysqlConnection');

exports.validateResLogin = [
  check('resUsername')
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
  check('resPassword')
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

exports.validateResRegistration = [
  check('resStreet')
    .not()
    .isEmpty()
    .withMessage('Street name cannot be empty.')
    .trim()
    .matches(/^[a-zA-Z0-9 ,.'-]+$/)
    .withMessage('Invalid street name.')
    .bail(),
  check('resCity')
    .not()
    .isEmpty()
    .withMessage('City name cannot be empty.')
    .trim()
    .matches(/^[a-zA-Z ,.'-]+$/)
    .withMessage('Invalid City name.')
    .bail(),
  check('resState')
    .not()
    .isEmpty()
    .withMessage('State name cannot be empty.')
    .trim()
    .matches(/^[a-zA-Z ,.'-]+$/)
    .withMessage('Invalid State name.')
    .bail(),
  check('resZipcode')
    .not()
    .isEmpty()
    .withMessage('Zipcode name cannot be empty.')
    .trim()
    .matches(/^[0-9]+$/)
    .withMessage('Invalid Zipcode name.')
    .bail(),
  check('resCountry')
    .not()
    .isEmpty()
    .withMessage('Country name cannot be empty.')
    .trim()
    .matches(/^[a-zA-Z ,.'-]+$/)
    .withMessage('Invalid country name.')
    .bail(),
  check('resName')
    .not()
    .isEmpty()
    .withMessage('Restaurant name cannot be empty.')
    .trim()
    .matches(/^[a-zA-Z ,.'-]+$/)
    .withMessage('Invalid restaurant name.')
    .bail(),
  check('resEmail')
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
        if(isUsernameInUse){
          throw new Error('Email already exists.');
        }
    })
    .withMessage('Email already exists.')
    .bail(),
  check('resPassword')
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
      con.query('SELECT COUNT(*) AS count FROM restaurants WHERE res_email = ?', [username], function (error, results, fields) {
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
