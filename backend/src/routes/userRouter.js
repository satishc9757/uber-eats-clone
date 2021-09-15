var userController = require('../contollers/userController');

var express = require('express');
var router = express.Router();

router.post("/user/register", userController.register_user);

router.post("/user/login", userController.login_user);

module.exports = router;