// Dependencies
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Calculate the default endDate
const getDefaultEndDate = () => {
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 30);
  return endDate;
}

const projectTemplateSchema = new Schema({
  name: {
    type: String,
    default: "Untitled Project",
  },
  description: {
    type: String,
    default: "No description provided",
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: getDefaultEndDate,
  },
  projectStatus: {
    type: String,
    default: "Not started",
  },
  team: [
    {
      type: Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },
  ],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
      default: null,
    },
  ],
});

module.exports = mongoose.model("ProjectTemplate", projectTemplateSchema);
