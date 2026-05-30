const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerGet = (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};

const registerPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.signup(email, password);
    const token = createToken(newUser._id);

    return res.status(201).json({ email: newUser.email, token: token });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

const loginGet = (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};

const loginPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    return res.status(200).json({ email: user.email, token: token });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

const logoutPost = (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};

module.exports = {
  registerGet,
  registerPost,
  loginGet,
  loginPost,
  logoutPost,
};
