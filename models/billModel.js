const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount must be non-negative"],
    },
    taxRate: {
      type: Number,
      required: [true, "Tax amount is required"],
      min: [0, "Tax amount must be non-negative"],
    },
    grandTotal: {
      type: Number,
      required: [true, "Tax amount is required"],
      min: [0, "Tax amount must be non-negative"],
    },
    cartItems: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
