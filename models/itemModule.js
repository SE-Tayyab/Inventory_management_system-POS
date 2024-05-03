const mongoose = require("mongoose");
const { Decimal128 } = mongoose.Schema.Types;

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Decimal128,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value >= 0,
      message: "Quantity must be a non-negative number",
    },
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    optional: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);