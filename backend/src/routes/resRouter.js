var resController = require('../contollers/resController');
const multer  = require('multer')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+"--image");
    },
});
const upload = multer({ storage: fileStorage });

var express = require('express');
const { validateResRegistration, validateResLogin, validateDishRegistration } = require('../validators/resValidations');
var router = express.Router();

router.post("/register", validateResRegistration, resController.register_res);

router.post("/login", validateResLogin, resController.res_login);

//router.post("/dish", upload.single('dishImage'), resController.add_dish);

router.put("/dish", resController.updateDish);
router.delete("/dish", resController.deleteDish);
router.get("/dish", resController.getAllDishes);
router.get("/dish/:id", resController.getDish);


module.exports = router;