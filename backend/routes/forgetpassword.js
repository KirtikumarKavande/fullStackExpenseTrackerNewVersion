const express = require("express");
const router = express.Router();
const auth =require("../middleware/Auth")
const forgetPasswordController=require('../controllers/ForgetPasswordController')
router.post("/forgetpassword", forgetPasswordController.forgetPassword);
router.get('/resetpassword/:id', forgetPasswordController.resetpassword)
router.get('/updatepassword/:resetpasswordid', forgetPasswordController.updatepassword)
module.exports = router;
