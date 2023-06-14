const mongoose = require("mongoose");
const Schemas = mongoose.Schema;

const users = new Schemas(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
    },
    token: String
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model("users", users);

module.exports = User;
