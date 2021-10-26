
const DISH_IMAGE_PATH = "images/dishes";
const RES_IMAGE_PATH = "images/restaurants";
var resController = require('../contollers/resController');
var resControllerMongo = require('../contollers/resControllerMongo');
var express = require('express');
const { validateResRegistration, validateResLogin, validateDishRegistration } = require('../validators/resValidations');
const multer  = require('multer')

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

router.get("/favorites", resController.getFavRestaurantsByCustId);
router.get("/query", resController.getRestaurantByQueryString);
router.post("/register", validateResRegistration, resControllerMongo.registerRes);
router.get("/id/:id", resControllerMongo.getRestaurantById);

//router.put("/update", resUpload.array('resImages', 5),resController.updateRestaurant);
router.put("/update", resUpload.single('resImage'),resControllerMongo.updateRestaurant); //single upload for now
router.post("/login", validateResLogin, resControllerMongo.res_login);
router.post("/logout", resController.logout);


router.get("/getDishByRes/:resId", resControllerMongo.getDishByRes);
router.get("/dish", resController.getAllDishes);

router.post("/dish", dishUpload.single('dishImage'), resControllerMongo.addDish);
router.get("/dish/:id", resController.getDish);
router.put("/dish", resController.updateDish);
router.delete("/dish", resController.deleteDish);

router.get("/orders", resController.getOrdersByRes);
router.get("/orderdetails", resController.getOrderDetailsByOrderId);

router.put("/order/status", resController.updateOrderStatus);



module.exports = router;