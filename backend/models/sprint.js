// Dependencies
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let sprintSchema = new Schema(
    {
        name: {
            type: String, 
            required: true, 
            min: 2, 
            max: 100
        },
        description: {
            type: String, 
            min: 10, 
            max: 100
        },
        startDate: {
            type: Date, 
            required: true
        },
        endDate: {
            type: Date, 
            required: true
        },
        // status: {
        //     type: String, 
        //     required: true, 
        //     min: 2, 
        //     max: 100
        // },
        projectId: {
            type: Schema.Types.ObjectId, 
            ref: 'Project'
        },
        tasks: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'Task'
            }
        ]
    });

    // Export model
module.exports = mongoose.model('Sprint', sprintSchema);