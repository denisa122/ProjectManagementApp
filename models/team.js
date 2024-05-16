const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let teamSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  teamLeader: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

module.exports = mongoose.model("Team", teamSchema);
