const User = require("../models/userModel");
const Post = require("../models/postModel");

const getUserByUsername = (req, res) => {
  const { username } = req.params;

  const user = User.findOne({ username });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user);
};

const getUserPostsByUsername = (req, res) => {
  const posts = Post.find({ authorID: req.user._id }).sort({ createdAt: -1 });

  if (!posts) {
    return res.status(404).json({ error: "No posts found for this user" });
  }

  res.status(200).json(posts);
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
  getUserByUsername,
  getUserPostsByUsername,
  updateUserByUsername,
  deleteUserPostById,
};
