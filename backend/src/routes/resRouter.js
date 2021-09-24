var resController = require('../contollers/resController');

var express = require('express');
const { validateResRegistration, validateResLogin, validateDishRegistration } = require('../validators/resValidations');
var router = express.Router();

router.post("/register", validateResRegistration, resController.register_res);

router.post("/login", validateResLogin, resController.res_login);

router.post("/dish", validateDishRegistration, resController.add_dish);

module.exports = router;