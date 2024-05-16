const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 100,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 100,
  },
  role: {
    type: String,
    max: 100,
  },
});

module.exports = mongoose.model("User", userSchema);
