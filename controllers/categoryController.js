const categoryModel = require("../models/categoryModel");

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    if (!categories || categories.length === 0) {
      // Check if categories array is empty
      return res.status(404).json({ error: "No categories found" }); // Return 404 if no categories are found
    }
    res.status(200).json(categories); // Return categories if found
  } catch (error) {
    console.error("Error retrieving categories:", error); // Log error
    res.status(500).json({ error: "Internal server error" }); // Return internal server error
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const { categoryId } = req.query; // Extract categoryId from the request query parameters
    // console.log(categoryId);
    const category = await categoryModel.findById(categoryId); // Find category by ID
    if (!category) {
      return res.status(404).json({ error: "Category not found" }); // Return 404 if category is not found
    }
    res.status(200).json(category); // Return the category if found
  } catch (error) {
    console.error("Error retrieving category:", error); // Log error
    res.status(500).json({ error: "Internal server error" }); // Return internal server error
  }
};

const AddCategories = async (req, res) => {
  try {
    const newCategory = new categoryModel(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json("Category is not added.");
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    if (!categoryId) {
      return res.status(400).json("Invalid Category ID");
    }
    await categoryModel.findOneAndDelete({ _id: categoryId });
    return res.status(200).json("Category Deleted Successfully");
  } catch (error) {
    console.error("Error while deleting category:", error);
    return res.status(500).json("Error while deleting category");
  }
};

module.exports = {
  getAllCategories,
  getSingleCategory,
  AddCategories,
  deleteCategory,
};
