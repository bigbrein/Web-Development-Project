const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    parentPost: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "UserInfo", required: true },
    parentCommentID: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: false,
    },
    body: { type: String, required: [true, "Comment body cannot be empty"] },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Comment", commentSchema);
