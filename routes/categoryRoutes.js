const express = require("express");
const {
  getAllCategories,
  getSingleCategory,
  AddCategories,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.get("/get-categories", getAllCategories);
router.get("/get-category", getSingleCategory);
router.post("/add-category", AddCategories);
router.post("/delete-category", deleteCategory);
module.exports = router;
