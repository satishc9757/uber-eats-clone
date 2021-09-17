var userController = require('../contollers/userController');
var { validateUserLogin } = require('../validators/userValidations');

var express = require('express');
var router = express.Router();

router.post("/register", userController.register_user);

router.post("/login", validateUserLogin, userController.login_user);

module.exports = router;