const { default: mongoose } = require("mongoose");
const Post = require("../models/postModel");
const UserInfo = require("../models/userInfoModel");

const handleError = (err) => {
  return err.message;
};

// Get all posts
const getAllPosts = async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  res.status(200).json(posts);
};

// Get a single post
const getPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.status(200).json(post);
};

// Create a new post
const createPost = async (req, res) => {
  const { title, content, imageURL } = req.body;
  const { _id } = req.user;

  const authorId = await UserInfo.findOne({ user: _id }).select("_id");

  try {
    const newPost = await Post.create({
      title,
      body: content,
      imageURL,
      authorID: authorId._id,
    });
    return res.status(201).json(newPost);
  } catch (err) {
    const error = handleError(err);
    return res.status(400).json({ error });
  }
};

// Update a post
const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { ...req.body },
      { returnDocument: "after" },
    );
  } catch (err) {
    const error = handleError(err);
    return res.status(400).json({ error });
  }

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.status(200).json(post);
};

// Delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  const post = await Post.findByIdAndDelete(id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.status(200).json({ message: "Post deleted successfully" });
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
