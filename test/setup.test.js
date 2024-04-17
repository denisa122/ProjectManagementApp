process.env.NODE_ENV = 'test';

const User = require('../backend/models/user');
const Team = require('../backend/models/team');
const Task = require('../backend/models/task');
const Sprint = require('../backend/models/sprint');
const Project = require('../backend/models/project');

before((done) => {
        Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Task.deleteMany({}),
            Sprint.deleteMany({}),
            Project.deleteMany({})
        ]).then(() => done());
    });
    
    after((done) => {
        Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Task.deleteMany({}),
            Sprint.deleteMany({}),
            Project.deleteMany({})
        ]).then(() => done());
    });