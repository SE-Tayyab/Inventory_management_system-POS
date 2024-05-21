const express = require("express");
const router = express.Router();

const {
  addBillController,
  getBillController,
  deleteBillController,
} = require("../controllers/billController");

router.post("/add-bill", addBillController);
router.get("/get-bills", getBillController);
router.post("/delete-bill", deleteBillController);

module.exports = router;
