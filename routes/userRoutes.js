const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/auth.middleware");

const {
  register,
  login,
  logOutUser,
  refreshAccessToken,
  getMe,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyJWT, logOutUser);
router.post("/refresh-token", refreshAccessToken);
router.get("/verify-token", verifyJWT, getMe);

module.exports = router;
