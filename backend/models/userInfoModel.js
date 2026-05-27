const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userInfoSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profileImgURL: {
      type: String,
      required: false,
      nullable: true,
      trim: true,
    },
    admin: { type: Boolean, default: false, required: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("UserInfo", userInfoSchema);
