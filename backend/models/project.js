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
        teamLeader: {
            type: Schema.Types.ObjectId, 
            ref: 'User'
        },
        members: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'User'
            }
        ]
    });

    // Export model
module.exports = mongoose.model('Project', projectSchema);