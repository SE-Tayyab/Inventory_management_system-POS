const Bill = require("../models/billModel");
const nodemailer = require("nodemailer");

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmeil.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER, // sender email address
    pass: process.env.APP_PASSWORD, // app password from gmail account
  },
});

// Function to send email
const sendEmail = async (totalAmount) => {
  const mailOptions = {
    from: {
      name: "Tayyab Sattar",
      address: process.env.USER,
    }, // sender address
    to: "tayyabsattararain@gmail.com, draz83517@gmail.com", // list of receivers
    subject: "Bills Deletion Notification ✔", // Subject line
    text: `All bills have been deleted. The total amount was ${totalAmount}.`, // plain text body
    html: `<b>All bills have been deleted. The total amount was ${totalAmount}.</b>`, // html body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

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
    if (!bills.length) {
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
    const totalEarnings = await Bill.aggregate([
      { $group: { _id: null, totalEarnings: { $sum: "$grandTotal" } } },
    ]);
    const totalAmount = totalEarnings[0] ? totalEarnings[0].totalEarnings : 0;

    await Bill.deleteMany({});

    await sendEmail(totalAmount); // Make sure to await the email sending

    return res.status(200).json({ message: "All bills deleted successfully." });
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
    res.status(500).json({ message: "Internal Server error:" });
  }
};

module.exports = {
  addBillController,
  getBillController,
  deleteBillController,
  totalAmount,
};
