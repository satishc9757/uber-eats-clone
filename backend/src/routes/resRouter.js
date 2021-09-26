
const DISH_IMAGE_PATH = "./images/dishes";
var resController = require('../contollers/resController');
var express = require('express');
const { validateResRegistration, validateResLogin, validateDishRegistration } = require('../validators/resValidations');
const multer  = require('multer')

//file upload setup
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DISH_IMAGE_PATH);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+"--"+file.originalname);
    },
});
const upload = multer({ storage: fileStorage });

var router = express.Router();

router.post("/register", validateResRegistration, resController.register_res);

router.post("/login", validateResLogin, resController.res_login);

router.post("/dish", upload.single('dishImage'), resController.addDish);

router.put("/dish", resController.updateDish);
router.delete("/dish", resController.deleteDish);
router.get("/dish", resController.getAllDishes);
router.get("/dish/:id", resController.getDish);

module.exports = router;