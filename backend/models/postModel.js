const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/*
 * Post model
 * Fields:
 * - title: String, required
 * - content: String?, required, nullable
 * - author: UserID, required, foreign key to User model
 * - timestamps: true (createdAt and updatedAt)
 */

const postSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Post", postSchema);
