const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    nickName: {
      type: String
    },
    avatar: {
      type: String
    },
    role: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Role"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Manager", managerSchema);
