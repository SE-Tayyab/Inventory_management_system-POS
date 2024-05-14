const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const verifyJWT = async (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies);
    console.log("Authorization Header:", req.headers.authorization);

    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.replace("Bearer ", "");

    console.log("Token:", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized request.........." });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid user ID." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message }, "Invalid Token :");
  }
};

module.exports = verifyJWT;
