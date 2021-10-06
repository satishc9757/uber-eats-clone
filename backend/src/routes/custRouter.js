var custController = require('../contollers/custController');
var { validateCustLogin, validateCustRegistration } = require('../validators/custValidations');

var express = require('express');
var router = express.Router();

router.post("/register", validateCustRegistration, custController.register_customer);

router.post("/login", validateCustLogin, custController.login_customer);

router.post("/order/create", custController.createOrder)

router.get("/order/address", custController.getDeliveryAddressesForUser);

module.exports = router;