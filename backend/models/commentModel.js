const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    postID: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    authorID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    body: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Comment", commentSchema);
