const express = require('express');
const { getItemController, getSingleItemController, addItemController } = require('../controllers/itemControler');

const router = express.Router();

// Routes
router.get('/get-item', getItemController); // Define a route for getting items
router.get('/get-item/:itemId', getSingleItemController);
router.post('/add-item', addItemController); // Define a route for adding items

module.exports = router;
