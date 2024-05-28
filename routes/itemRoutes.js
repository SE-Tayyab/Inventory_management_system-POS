const express = require("express");
const multerUpload = require("../middlewares/multer.middleware.js");
const verifyJWT = require("../middlewares/auth.middleware.js");

const {
  getItemController,
  getSingleItemController,
  addItemController,
  editItemController,
  deleteItemController,
} = require("../controllers/itemControler");

const router = express.Router();

// Routes
router.post(
  "/add-item",
  multerUpload.fields([{ name: "image", maxCount: 1 }]),
  addItemController
);
router.get("/get-item", getItemController);
router.get("/get-item/:itemId", getSingleItemController);
router.put("/edit-item/:itemId", editItemController);
router.post("/get-item/delete-item", deleteItemController);

module.exports = router;
