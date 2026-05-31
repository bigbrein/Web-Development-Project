const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/*
 * Post model
 * Fields:
 * - title: String, required
 * - body: String?, required, nullable
 * - imageURL: String?, required, nullable
 * - authorID: UserID, required, foreign key to User model
 * - upvotes: [UserID], array of UserIDs who upvoted the post
 * - downvotes: [UserID], array of UserIDs who downvoted the post
 * - timestamps: true (createdAt and updatedAt)
 */

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  body: {
    type: String,
    required: false,
    trim: true,
    default: "",
  },
  imageURL: {
    type: String,
    required: false,
    trim: true,
    default: "",
  },
  authorID: {
    type: Schema.Types.ObjectId,
    ref: "UserInfo",
    required: true,
  },
  upvotes: { type: [Schema.Types.ObjectId], default: [] },
  downvotes: { type: [Schema.Types.ObjectId], default: [] },
  commentCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
