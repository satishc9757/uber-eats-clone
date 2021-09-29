
const DISH_IMAGE_PATH = "./images/dishes";
const RES_IMAGE_PATH = "./images/restaurants";
var resController = require('../contollers/resController');
var express = require('express');
const { validateResRegistration, validateResLogin, validateDishRegistration } = require('../validators/resValidations');
const multer  = require('multer')

//file upload setup
const resFileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, RES_IMAGE_PATH);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+"--"+file.originalname);
    },
});

const dishFileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DISH_IMAGE_PATH);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+"--"+file.originalname);
    },
});

const resUpload = multer({ storage: resFileStorage });
const dishUpload = multer({ storage: dishFileStorage });

var router = express.Router();

router.post("/register", validateResRegistration, resController.register_res);
router.get("/:id", resController.getRestaurantById);
router.put("/update", resUpload.array('resImages', 5),resController.updateRestaurant);

router.post("/login", validateResLogin, resController.res_login);

router.post("/dish", dishUpload.single('dishImage'), resController.addDish);

router.put("/dish", resController.updateDish);
router.delete("/dish", resController.deleteDish);
router.get("/dish", resController.getAllDishes);
router.get("/dish/:id", resController.getDish);

module.exports = router;