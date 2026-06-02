const express = require("express");
const requireAuth = require("../middleware/requireAuth.js");

const {
  getCommentsByPostID,
  postComment,
} = require("../controllers/commentController.js");

const router = express.Router();

router.get("/:postID", getCommentsByPostID);
router.post("/", requireAuth, postComment);
router.delete("/:commentID", requireAuth);

module.exports = router;
