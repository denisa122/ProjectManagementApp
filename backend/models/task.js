// Dependencies
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let taskSchema = new Schema(
    {
        name: {
            type: String, 
            required: true, 
            min: 2, 
            max: 100
        },
        description: {
            type: String, 
            required: true, 
            min: 10, 
            max: 100
        },
        startDate: {
            type: Date, 
            required: true
        },
        status: {
            type: String, 
            required: true, 
            min: 2, 
            max: 100
        },
        projectId: {
            type: Schema.Types.ObjectId, 
            ref: 'Project'
        },
        assignedTeamMember: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'User'
            }
        ]
    });

    // Export model
module.exports = mongoose.model('Task', taskSchema);