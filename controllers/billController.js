const Bill = require("../models/billModel");

const addBillController = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).send({ message: "All fields are required." });
    }

    const bill = await Bill.create(data);

    if (!bill) {
      return res
        .status(500)
        .send({ message: "Something went wrong while saving the bill." });
    }

    return res
      .status(200)
      .json({ data: bill, message: "Bill created successfully." });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error." });
  }
};

const getBillController = async (req, res) => {
  try {
    const bills = await Bill.find();
    console.log(bills);
    if (!bills) {
      return res.status(404).json({ message: "No bills found." });
    }
    return res
      .status(200)
      .json({ data: bills, message: "Bills retrieved successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

const deleteBillController = async (req, res) => {
  try {
    const { billId } = req.body;
    console.log(billId);
    if (!billId) {
      return res.status(400).json({ message: "Bill ID is required." });
    }

    const deletedBill = await Bill.findByIdAndDelete(billId);
    if (!deletedBill) {
      return res.status(404).json({ message: "Bill not found." });
    }

    return res.status(200).json({ message: "Bill deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

const totalAmount = async (req, res) => {
  try {
    const totalEarnings = await Bill.aggregate([
      { $group: { _id: null, totalEarnings: { $sum: "$grandTotal" } } },
    ]);
    res.status(200).json({ totalEarnings: totalEarnings[0].totalEarnings });
  } catch (e) {
    res.status(500).json({ message: "internal Server error:" });
  }
};

module.exports = {
  addBillController,
  getBillController,
  deleteBillController,
  totalAmount,
};
