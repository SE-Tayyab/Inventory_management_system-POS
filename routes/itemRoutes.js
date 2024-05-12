const express = require("express");
const {
  getItemController,
  getSingleItemController,
  addItemController,
  editItemController,
  deleteItemController,
} = require("../controllers/itemControler");

const router = express.Router();

// Routes
router.get("/get-item", getItemController);
router.get("/get-item/:itemId", getSingleItemController);
router.post("/add-item", addItemController);
router.put("/edit-item/:itemId", editItemController);
router.post("/get-item/delete-item", deleteItemController);

module.exports = router;
