const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ],
    },
  },
  { timestamps: true },
);

userSchema.statics.signup = async function (email, password) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds).catch((err) => {
    throw Error("Error generating salt for password hashing");
  });

  password = await bcrypt.hash(password, salt).catch((err) => {
    throw Error("Error hashing password");
  });

  const newUser = await this.create({
    email: email,
    password: password,
  });

  return newUser;
};

module.exports = mongoose.model("User", userSchema);
