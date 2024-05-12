const itemModel = require("../models/itemModule");

// get items
const getItemController = async (req, res) => {
  try {
    const items = await itemModel.find();
    res.status(200).send(items);
  } catch (error) {
    console.log(error, "getItemCon");
  }
};

const getSingleItemController = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const item = await itemModel.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// add items
const addItemController = async (req, res) => {
  try {
    const { name, price, quantity, category, image } = req.body;
    if (!name || !price || !quantity || !category) {
      return res.status(400).send("Missing required fields in item data.");
    }

    const newItem = new itemModel(req.body);
    await newItem.save();
    res.status(201).send("Item created successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const editItemController = async (req, res) => {
  const itemId = req.params.itemId;
  const newData = req.body;

  try {
    // Find the item by ID and update it with the new data
    const updatedItem = await itemModel.findByIdAndUpdate(itemId, newData, {
      new: true,
    });

    if (!updatedItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.body;
    await itemModel.findOneAndDelete({ _id: itemId });
    res.status(200).json("Item successfully deleted");
  } catch (e) {
    console.log(e, "deleteItemController error lol");
    res.status(400).json("Failed to delete item lol");
  }
};

module.exports = {
  getItemController,
  getSingleItemController,
  addItemController,
  editItemController,
  deleteItemController,
};
