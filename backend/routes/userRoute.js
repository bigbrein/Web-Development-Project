const express = require("express");

const {
  getUserByUsername,
  getUserPostsByUsername,
  deleteUserPostById,
  updateUserByUsername,
} = require("../controllers/userController");

const router = express.Router();

router.get("/:username", getUserByUsername);
router.get("/:username/posts", getUserPostsByUsername);
router.put("/:username", updateUserByUsername);
router.delete("/:username/posts/:id", deleteUserPostById);

module.exports = router;
