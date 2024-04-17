process.env.NODE_ENV = 'test';

const User = require('../models/user');
const Team = require('../models/team');
const Task = require('../models/task');
const Sprint = require('../models/sprint');
const Project = require('../models/project');

// Clean DB before and after tests
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