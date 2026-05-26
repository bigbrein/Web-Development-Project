const User = require("../models/userModel");

const getUserByUsername = (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};

const getUserPostsByUsername = (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};

const updateUserByUsername = (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};

const deleteUserPostById = (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};

module.exports = {
  getUserByUsername,
  getUserPostsByUsername,
  updateUserByUsername,
  deleteUserPostById,
};
