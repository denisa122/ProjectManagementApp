// Dependencies
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let projectSchema = new Schema(
    {
        name: {
            type: String, 
            min: 2, 
            max: 100
        },
        description: {
            type: String, 
            min: 10, 
            max: 100
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        projectStatus: {
            type: String, 
            min: 2, 
            max: 100
        },
        team: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'Team'
            }
        ],
        tasks: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'Task'
            }
        ],
        templateId: {
            type: Schema.Types.ObjectId, 
            ref: 'ProjectTemplate'
        }
    });

    // Export model
module.exports = mongoose.model('Project', projectSchema);