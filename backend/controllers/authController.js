const User = require("../models/userModel");
const UserInfo = require("../models/userInfoModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const completeUserRegistration = async (req, res) => {
  const { username, profileImgURL } = req.body;
  const { _id } = req.user;

  const token = createToken(_id);

  try {
    const newUserInfo = await UserInfo.createUserInfo(
      _id,
      username,
      profileImgURL,
    );
    return res.status(201).json({
      id: _id,
      username: newUserInfo.username,
      profileImgURL: newUserInfo.profileImgURL,
      token: token,
    });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.signup(email, password);
    const token = createToken(newUser._id);

    return res.status(201).json({
      id: newUser._id,
      username: null,
      email: newUser.email,
      token: token,
    });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    const userInfo = await UserInfo.findOne({ user: user._id }).select(
      "username profileImgURL",
    );

    if (!userInfo) {
      return res.status(200).json({
        id: user._id,
        username: null,
        email: user.email,
        token: token,
      });
    }

    return res.status(200).json({
      id: user._id,
      username: userInfo.username,
      profileImgURL: userInfo.profileImgURL,
      token: token,
    });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

const logout = (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};

module.exports = {
  register,
  login,
  logout,
  completeUserRegistration,
};
