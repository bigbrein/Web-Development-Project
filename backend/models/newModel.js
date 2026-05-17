const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
