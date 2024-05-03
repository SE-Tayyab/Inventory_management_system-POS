const express = require("express");
const morgan = require("morgan");
// const bodyParser = require("body-parser");
const cors = require("cors");
const env = require("dotenv");
const connectDb = require("./config/config");
require("colors");

// dotenv config
env.config();
// database config
connectDb();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
//Method get
app.use("/api/items", require("./routes/itemRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is listen on port ${PORT}`.bgCyan.white);
});