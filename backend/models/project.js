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
        // teamLeader: {
        //     type: Schema.Types.ObjectId, 
        //     ref: 'User'
        // },  maybe i don't need this if lower i'm referencing the team that already has teamLeader
        members: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'Team'
            }
        ],
        currentSprint: {
            type: Schema.Types.ObjectId, 
            ref: 'Sprint'
        },
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