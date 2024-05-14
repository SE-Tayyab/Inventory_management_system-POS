const userModel = require("../models/user.model");

const accessTokenAndRefreshTokenGenerator = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    // console.log(user);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (e) {
    throw new apiError(
      500,
      e.message ||
        "someThing went wrong white generating refresh token and access token"
    );
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field?.trim() === "")) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const existedUser = await userModel.findOne({ email });

  if (existedUser) {
    return res
      .status(409)
      .json({ error: "User with this email already exists." });
  }

  try {
    const user = await userModel.create({
      username,
      password,
      email,
    });

    const createdUser = await userModel
      .findById(user._id)
      .select("-password -refreshToken");

    if (!createdUser) {
      return res
        .status(500)
        .json({ error: "Something went wrong while registering user." });
    }

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
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "The email is not registered." });
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

module.exports = { register, login, logOutUser };
