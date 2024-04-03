// Dependencies
var mongoose = require('mongoose');

const Schema = mongoose.Schema;

let projectSchema = new Schema(
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
        endDate: {
            type: Date, 
            required: true
        },
        status: {
            type: String, 
            required: true, 
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
    });

    // Export model
module.exports = mongoose.model('Project', projectSchema);