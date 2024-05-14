const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/auth.middleware");

const {
  register,
  login,
  logOutUser,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyJWT, logOutUser);

module.exports = router;
