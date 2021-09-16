var userController = require('../contollers/userController');

var express = require('express');
var router = express.Router();

router.post("/register", userController.register_user);

router.post("/login", userController.login_user);

module.exports = router;