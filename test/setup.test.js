process.env.NODE_ENV = 'test';

const User = require('../backend/models/user');
const Team = require('../backend/models/team');
const Task = require('../backend/models/task');
const Sprint = require('../backend/models/sprint');
const Project = require('../backend/models/project');

before(async () => {
        await User.deleteMany({});
        await Team.deleteMany({});
        await Task.deleteMany({});
        await Sprint.deleteMany({});
        await Project.deleteMany({});
});

after(async () => {
        await User.deleteMany({});
        await Team.deleteMany({});
        await Task.deleteMany({});
        await Sprint.deleteMany({});
        await Project.deleteMany({});
});