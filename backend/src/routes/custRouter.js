var custController = require('../contollers/custController');
var { validateCustLogin, validateCustRegistration } = require('../validators/custValidations');
const custControllerMongo = require('../contollers/custControllerMongo');
const CUST_IMAGE_PATH = "images/customer";
const multer  = require('multer')
const {checkAuth} = require('../jwt/passport')

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

router.post("/register", custControllerMongo.registerCustomerKafka);

router.get("/id/:id", checkAuth, custControllerMongo.getCustomerById);
//router.post("/login", validateCustLogin, custControllerMongo.loginCustomer);
router.post("/login", custControllerMongo.loginCustomerKafka);
router.post("/logout", custController.logout);
// router.put("/update", custUpload.single('custImage'), custController.updateCustomerProfile);
router.put("/update", checkAuth, custUpload.single('custImage'), custControllerMongo.customerUpdateKafka);
router.get("/query", checkAuth, custControllerMongo.getRestaurantByQueryString);
router.post("/order/create", checkAuth, custControllerMongo.createOrder);
router.post("/order/cancel", checkAuth, custControllerMongo.cancelOrder);

router.get("/order/address", checkAuth, custControllerMongo.getDeliveryAddressesForUser);

router.get("/orders", checkAuth, custControllerMongo.getOrdersByCustomer);

router.get("/orderdetails", checkAuth, custControllerMongo.getOrderDetailsByOrderId);

router.post("/favorite", checkAuth, custControllerMongo.addFavoriteRes)

module.exports = router;