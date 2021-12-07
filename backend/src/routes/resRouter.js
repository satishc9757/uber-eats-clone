
const DISH_IMAGE_PATH = "images/dishes";
const RES_IMAGE_PATH = "images/restaurants";
var resController = require('../contollers/resController');
var resControllerMongo = require('../contollers/resControllerMongo');
var express = require('express');
const { validateResRegistration, validateResLogin, validateDishRegistration } = require('../validators/resValidations');
const multer  = require('multer')
const {checkAuth} = require('../jwt/passport')

//file upload setup
const resFileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, RES_IMAGE_PATH);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const dishFileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DISH_IMAGE_PATH);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const resUpload = multer({ storage: resFileStorage });
const dishUpload = multer({ storage: dishFileStorage });

var router = express.Router();

router.get("/favorites", checkAuth, resControllerMongo.getFavRestaurantsByCustId);
router.get("/query", checkAuth, resControllerMongo.getRestaurantByQueryString);
router.post("/register", validateResRegistration, resControllerMongo.registerRes);
//router.post("/register", validateResRegistration, resControllerMongo.registerRes);
router.get("/id/:id", resControllerMongo.getRestaurantById);

//router.put("/update", resUpload.array('resImages', 5),resController.updateRestaurant);
router.put("/update", checkAuth, resUpload.single('resImage'),resControllerMongo.updateRestaurant); //single upload for now
router.post("/login", resControllerMongo.res_login);
router.post("/logout", resController.logout);


router.get("/getDishByRes/:resId", checkAuth, resControllerMongo.getDishByRes);
router.get("/dish", checkAuth, resController.getAllDishes);

router.post("/dish", dishUpload.single('dishImage'), resControllerMongo.addDishKafka);
router.get("/dish/:id", checkAuth, resControllerMongo.getDish);
router.put("/dish", checkAuth, resControllerMongo.updateDish);
router.delete("/dish", checkAuth, resController.deleteDish);

router.get("/orders", checkAuth, resControllerMongo.getOrdersByRes);
router.get("/orderdetails", checkAuth, resController.getOrderDetailsByOrderId);

router.put("/order/status", checkAuth, resControllerMongo.updateOrderStatus);



module.exports = router;