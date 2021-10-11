var custController = require('../contollers/custController');
var { validateCustLogin, validateCustRegistration } = require('../validators/custValidations');
const CUST_IMAGE_PATH = "images/customer";
const multer  = require('multer')

//file upload setup
const custFileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, CUST_IMAGE_PATH);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const custUpload = multer({ storage: custFileStorage });

var express = require('express');
var router = express.Router();

router.post("/register", validateCustRegistration, custController.register_customer);

router.get("/id/:id", custController.getCustomerById);
router.post("/login", validateCustLogin, custController.login_customer);
router.post("/logout", custController.logout);
router.put("/update", custUpload.single('custImage'), custController.updateCustomerProfile);

router.post("/order/create", custController.createOrder)


router.get("/order/address", custController.getDeliveryAddressesForUser);

router.get("/orders", custController.getOrdersByCustomer);

router.get("/orderdetails", custController.getOrderDetailsByOrderId);

router.post("/favorite", custController.addFavoriteRes)

module.exports = router;