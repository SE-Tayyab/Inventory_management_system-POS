const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const accessTokenAndRefreshTokenGenerator = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(
      "Something went wrong while generating refresh token and access token"
    );
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  try {
    const existedUser = await userModel.findOne({ email });
    if (existedUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists." });
    }

    const user = await userModel.create({ username, password, email });

    const createdUser = await userModel
      .findById(user._id)
      .select("-password -refreshToken");

    return res
      .status(200)
      .json({ message: "User created successfully.", user: createdUser });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong while registering user." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res
      .status(400)
      .json({ message: "Please enter email and password both." });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(409).json({ message: "The email is not registered." });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    const { refreshToken, accessToken } =
      await accessTokenAndRefreshTokenGenerator(user._id);

    const loggedInUser = await userModel
      .findById(user._id)
      .select("-password -refreshToken");

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "User logged in successfully.",
        user: loggedInUser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong while logging in." });
  }
};

const logOutUser = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    };

    return res
      .status(200)
      .cookie("accessToken", "", options)
      .cookie("refreshToken", "", options)
      .json({ message: "User logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong while logging out" });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json({ message: "Unauthorized request" });
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await userModel.findById(decodedToken?._id);

    if (!user || incomingRefreshToken !== user?.refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await accessTokenAndRefreshTokenGenerator(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json({
        accessToken,
        refreshToken: newRefreshToken,
        message: "Access token refreshed successfully",
      });
  } catch (error) {
    return res
      .status(401)
      .json({ message: error?.message || "Invalid refresh token" });
  }
};

module.exports = { register, login, logOutUser, refreshAccessToken };
