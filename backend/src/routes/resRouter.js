var resController = require('../contollers/resController');

var express = require('express');
var router = express.Router();

router.post("/register", resController.register_res);

router.post("/login", resController.login_res);

module.exports = router;