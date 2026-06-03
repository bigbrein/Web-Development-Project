const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const {
  getUserByID,
  getUserByUsername,
  getUserPostsByUsername,
  deleteUserPostById,
  updateUserByUsername,
} = require("../controllers/userController");

const router = express.Router();

router.get("/:id", getUserByID);
router.get("/username/:username", getUserByUsername);
router.get("/:username/posts", getUserPostsByUsername);
router.put("/:username", requireAuth, updateUserByUsername);
router.delete("/:username/posts/:id", requireAuth, deleteUserPostById);

module.exports = router;
