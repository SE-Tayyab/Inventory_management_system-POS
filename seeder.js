const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const itemModel = require("./models/itemModule");
const { categoryModel } = require("./models/categoryModel");
const { items, categories } = require("./utils/data");

// Config
dotenv.config();
connectDb();

// Function to import data
const importData = async () => {
  try {
    // Insert items
    await itemModel.deleteMany();
    const itemData = await itemModel.insertMany(items);
    console.log("All items added".bgGreen);

    // Insert categories
    // await categoryModel.deleteMany();
    // const categoryData = await categoryModel.insertMany(categories);
    // console.log("All categories added".bgGreen);

    // Exit process
    process.exit();
  } catch (error) {
    console.log(`${error} while importing data in seeder`.bgRed.inverse);
    process.exit(1);
  }
};

// Call importData function
importData();
