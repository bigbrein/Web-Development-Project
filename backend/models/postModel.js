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

const postSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: false, nullable: true, trim: true },
    imageURL: { type: String, required: false, nullable: true, trim: true },
    authorID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    upvotes: { type: [Schema.Types.ObjectId], default: [] },
    downvotes: { type: [Schema.Types.ObjectId], default: [] },
    commentCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Post", postSchema);
