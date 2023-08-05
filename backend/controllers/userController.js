const asyncHandler = require("express-async-handler"); // middleware to handle errors while async operations
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, profilePicture } = req.body;

  const userAlreadyExists = await User.findOne({ email });

  if (userAlreadyExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const newUser = await User.create({
    name,
    email,
    password,
    profilePicture,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      profilePicture: newUser.profilePicture,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Error occured while registering new user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  // if user exists then check password or throw wrong user error
  if (user) {
    if (await user.matchPassword(password)) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        profilePicture: user.profilePicture,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invaid password");
    }
  } else {
    res.status(400);
    throw new Error("Invaid email");
  }
});

module.exports = { registerUser, authUser };
