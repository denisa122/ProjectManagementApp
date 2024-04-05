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
        number: {
            type: Number, 
            required: true
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
        ],
        attachments: [
            {
                type: String
            }
        ]
    });

    // Export model
module.exports = mongoose.model('Task', taskSchema);