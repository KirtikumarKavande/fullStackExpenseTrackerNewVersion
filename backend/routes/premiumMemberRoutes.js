const express = require("express");
const purchasepremiumController = require("../controllers/premiumMemberController");

const router = express.Router();
const auth = require("../middleware/Auth");

router.get(
  "/premiummemberactivation",
  auth.authenticate,
  purchasepremiumController.purchasepremium
);
router.post(
  "/updatetransactionstatus",
  auth.authenticate,
  purchasepremiumController.updatetransactionstatus
);

router.get(
  "/showleaderboard",
  purchasepremiumController.showleaderboard
);

module.exports = router;
