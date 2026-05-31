const express = require("express");

const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPost);
router.post("/", requireAuth, createPost);
router.patch("/:id", requireAuth, updatePost);
router.delete("/:id", requireAuth, deletePost);

module.exports = router;
