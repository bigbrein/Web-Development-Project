const CommentModel = require("../models/commentModel.js");
const PostModel = require("../models/postModel.js");

const getCommentsByPostID = async (req, res) => {
  const { postID } = req.params;

  try {
    const comments = await CommentModel.find({ parentPost: postID }).sort({
      createdAt: -1,
    });

    if (!comments) {
      return res.status(404).json({ error: "No comments found for this post" });
    }

    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const postComment = async (req, res) => {
  const { parentPost, author, content } = req.body;

  try {
    const newComment = await CommentModel.create({
      parentPost: parentPost,
      author: author,
      content: content,
    });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getCommentsByPostID,
  postComment,
};
