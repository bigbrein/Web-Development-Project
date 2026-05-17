const { default: mongoose } = require("mongoose");
const Post = require("../models/postModel");

// Get all posts
const getAllPosts = async (req, res) => {
  console.log("getAllPosts called");

  const posts = await Post.find({}).sort({ createdAt: -1 });

  res.status(200).json(posts);
};

// Get a single post
const getPost = async (req, res) => {
  console.log("getPost called");

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
  console.log("createPost called");

  const { name } = req.body;

  const newPost = await Post.create({ name });

  res.status(201).json(newPost);
};

// Update a post
const updatePost = async (req, res) => {
  console.log("updatePost called");

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  const post = await Post.findByIdAndUpdate(
    id,
    { ...req.body },
    { returnDocument: "after" },
  );

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.status(200).json(post);
};

// Delete a post
const deletePost = async (req, res) => {
  console.log("deletePost called");

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
