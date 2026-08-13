const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "vendor"],
      required: true,
    },

    companyName: {
      type: String,
      default: "",
      trim: true,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
    status: {
  type: String,
  enum: ["pending", "approved", "rejected"],
  default: "pending",
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);