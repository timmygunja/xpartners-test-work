const mongoose = require("mongoose");
const validator = require("validator");

const instance = new mongoose.Schema(
  {
    /*
      document ID is set by default via MongoDB - next line is deprecated
      _id: mongoose.Schema.Types.ObjectId,
    */

    username: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    password_unsafe: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "invalid email"],
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      lowercase: true,
    },
    image: {
      type: String,
      required: false,
      default: "public/defaultUser.png",
    }, // url to image
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// NOTE! use a singular model name, mongoose automatically creates a collection like so:
// model: 'Account' === collection: 'accounts'
const modelName = "Account";

module.exports = mongoose.model(modelName, instance);
