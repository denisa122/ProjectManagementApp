const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let taskSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: "Task",
    min: 2,
    max: 100,
  },
  number: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
    required: true,
    default: "Task description",
    min: 10,
    max: 100,
  },
  startDate: {
    type: Date,
    default: null,
  },
  taskStatus: {
    type: String,
    default: "To do",
    min: 2,
    max: 100,
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
  },
  assignedTeamMember: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  attachments: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Task", taskSchema);
