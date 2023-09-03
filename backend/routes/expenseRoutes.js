const express = require("express");
const router = express.Router();
const auth =require("../middleware/Auth")

const expensecontroller = require("../controllers/expenseController");
router.post("/add-expense", auth.authenticate,expensecontroller.addexpense);
router.get("/show-expense",auth.authenticate, expensecontroller.getexpense);
router.get("/delete-expense/:id",auth.authenticate, expensecontroller.deleteExpense);
router.get("/downloadexpenses",auth.authenticate, expensecontroller.downloadexpenses);


module.exports = router;
