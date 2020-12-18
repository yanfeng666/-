const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    descriptions: {
      type: String
    },
    jurisdiction: {
      type: Array
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Role", roleSchema);
