const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const handleError = (err) => {
  let errors = { email: "", password: "" };

  if (err.code === 11000) {
    email = "Email already registered";
    return errors;
  }

  if (
    typeof err.message === "string" &&
    err.message.toLowerCase().includes("user validation failed")
  ) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  } else {
    return err.message || "Something went wrong";
  }

  return errors;
};

const registerGet = (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};

const registerPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.signup(email, password);
    return res.status(201).json({ user: newUser });
  } catch (err) {
    const errors = handleError(err);
    return res.status(400).json({ errors });
  }
};

const loginGet = (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};

const loginPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    const errors = handleError(err);
    return res.status(400).json({ errors });
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
