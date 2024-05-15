// Dependencies
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
  // username: {
  //     type: String,
  //     required: true,
  //     min: 6,
  //     max: 100
  // },  maybe i don't need this for a team of people who work together
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

// Export model
module.exports = mongoose.model("User", userSchema);
