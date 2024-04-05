// Dependencies
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectTemplateSchema = new Schema(
    {
        name: {
            type: String,
            default: 'Untitled Project'
        },
        description: {
            type: String,
            default: 'No description provided'
        },
        startDate: {
            type: Date,
            default: Date.now
        },
        endDate: {
            type: Date,
            default: null
        },
        projectStatus: {
            type: String,
            default: 'Not started'
        },
        team: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Team',
                default: null
            }
        ],
        currentSprint: {
            type: Schema.Types.ObjectId,
            ref: 'Sprint',
            default: null
        },
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Task',
                default: null
            }
        ],
    }

);

module.exports = mongoose.model('ProjectTemplate', projectTemplateSchema);