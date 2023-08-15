const asyncHandler = require("express-async-handler"); // middleware to handle errors while async operations
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

//@description     Register new user
//@route           POST /api/users/
//@access          Public
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

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  // if user exists then check password or throw wrong user error
  if (user) {
    if (await user.matchPassword(password)) {
      res.status(200).json({
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

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // Find the user.
  const user = await User.findById(req.user._id);

  // Update the details which are sent in req.body(payload) else assign the same previous value
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.profilePicture = req.body.profilePicture || user.profilePicture;
    // updated password only if it is sent in req.body
    if (req.body.password) {
      user.password = req.body.password;
    }

    // save the updaed user
    const updatedUser = await user.save();

    // send the response without password
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = { registerUser, authUser, updateUserProfile };
