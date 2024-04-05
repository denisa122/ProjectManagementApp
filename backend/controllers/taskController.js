// Dependencies
const Task = require('../models/task');
const Project = require('../models/project');

const createTask = async (req, res) => {
    try {
        const name = req.body.name;
        const number = req.body.number;
        const description = req.body.description;
        const startDate = req.body.startDate;
        const taskStatus = req.body.taskStatus;
        const assignedTeamMember = req.body.assignedTeamMember;
        const attachments = req.body.attachments;

        // I had to make it a query parameter because I couldn't access it from the URL
        const projectId = req.query.projectId;

        // Check if projectId exists
        const project = await Project.findById(projectId);


        if (!project || !project._id) {
            return res.status(400).json({message: 'Invalid project Id'});
        }

        if (!(project instanceof Project)) {
            return res.status(500).json({message: 'Invalid project object'});
        }

        if (!project.tasks) {
            project.tasks = [];
        }

        const task = new Task({
            name,
            number,
            description,
            startDate,
            taskStatus,
            projectId,
            assignedTeamMember,
            attachments
        });

        const savedTask = await task.save();

        // Add task to project
        project.tasks.push(savedTask);
        await project.save();
        
        res.status(201).json(savedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
};

const getAllTasksForProject = async (req, res) => {
    
};

const getTaskDetailsById = async (req, res) => {

};

const updateTask = async (req, res) => {

};

const deleteTask = async (req, res) => {

};

module.exports = {
    createTask,
    getAllTasksForProject,
    getTaskDetailsById,
    updateTask,
    deleteTask
};