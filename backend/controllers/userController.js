const User = require("../models/userModel");
const Post = require("../models/postModel");
const UserInfo = require("../models/userInfoModel");

const getUserByID = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserInfo.findOne({ _id: id }).select(
      "username profileImgURL",
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUserPostsByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const authorID = await UserInfo.findOne({ username: username }).select(
      "id",
    );

    if (!authorID) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({ authorID: authorID }).sort({
      createdAt: -1,
    });

    if (!posts) {
      return res.status(404).json({ error: "No posts found for this user" });
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error("userController.js: Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateUserByUsername = (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};

const deleteUserPostById = (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  const post = Post.findByIdAndDelete(id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.status(200).json({ message: "Post deleted successfully" });
};

module.exports = {
  getUserByID,
  getUserPostsByUsername,
  updateUserByUsername,
  deleteUserPostById,
};
