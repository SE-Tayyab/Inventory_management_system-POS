const express = require("express");
const router = express.Router();

const {
  addBillController,
  getBillController,
  deleteBillController,
  totalAmount,
} = require("../controllers/billController");

router.post("/add-bill", addBillController);
router.get("/get-bills", getBillController);
router.post("/delete-bill", deleteBillController);
router.get("/total-earnings", totalAmount);

module.exports = router;
