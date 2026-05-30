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
      required: function () {
        return this.role === "admin" || this.role === "user";
      },
      unique: true,
    },
    profileImgURL: {
      type: String,
      required: false,
      nullable: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "guest"],
      default: "user",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("UserInfo", userInfoSchema);
