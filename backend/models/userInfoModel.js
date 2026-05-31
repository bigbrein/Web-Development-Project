const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userInfoSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
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
      default: "",
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

userInfoSchema.statics.createUserInfo = async function (
  userId,
  username,
  profileImgURL,
) {
  if (!userId) {
    throw Error(`Author ID cannot be empty`);
  }

  const exists = await this.findOne({ username });
  if (exists) {
    throw Error(`Username is already taken`);
  }

  const newUserInfo = await this.create({
    user: userId,
    username: username,
    profileImgURL: profileImgURL,
  });

  return newUserInfo;
};

module.exports = mongoose.model("UserInfo", userInfoSchema);
