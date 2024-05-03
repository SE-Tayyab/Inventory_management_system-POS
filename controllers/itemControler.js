
const itemModel = require("../models/itemModule");

// get items
const getItemController = async (req, res) => {
    try {
        const items = await itemModel.find();
        res.status(200).send(items);
    } catch (error) {
        console.log(error);
    };
};

const getSingleItemController = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        console.log(itemId,"lol lol lol");
        const item = await itemModel.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
            console.log(itemId,"lol lol lol lol");
        }
        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        console.log(itemId,"lol lol lol lol");
    }
}

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

module.exports = { getItemController,getSingleItemController, addItemController };