var resController = require('../contollers/resController');

var express = require('express');
var router = express.Router();

router.post("/res/register", resController.register_res);

router.post("/res/login", resController.login_res);

module.exports = router;