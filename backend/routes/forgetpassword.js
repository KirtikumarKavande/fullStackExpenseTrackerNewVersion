const express = require("express");
const router = express.Router();
const auth =require("../middleware/Auth")
const forgetPasswordController=require('../controllers/ForgetPasswordController')
router.post("/forgetpassword", forgetPasswordController.forgetPassword);
module.exports = router;
