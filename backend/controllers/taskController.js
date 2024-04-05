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
        res.status(500).json({message: error.message});
    }
};

const getAllTasksForProject = async (req, res) => {
    const projectId = req.query.projectId;

    try {
        const tasks = await Task.find({projectId}).populate({
            path: 'assignedTeamMember',
            select: 'firstName lastName'
        });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Implement after I implement sprint
const getAllTasksForSprint = async (req, res) => {

};

const getTaskDetailsById = async (req, res) => {
    const taskId = req.params.taskId;
    const projectId = req.query.projectId;

    try {
        const task = await Task.findById(taskId).populate({
            path: 'assignedTeamMember',
            select: 'firstName lastName'
        });
        
        if (!taskId) {
            return res.status(400).json({message: 'Task not found'});
        }

        const project = await Project.findById(projectId).populate({
            path: 'tasks',
            select: 'name number'
        });

        if (!project) {
            return res.status(400).json({message: 'Project not found'});
        }

        // Combine task and project details
        const taskDetails = {
            task: task,
            project: project
        };

        res.status(200).json(taskDetails);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateTask = async (req, res) => {

};

const deleteTask = async (req, res) => {

};

module.exports = {
    createTask,
    getAllTasksForProject,
    getAllTasksForSprint,
    getTaskDetailsById,
    updateTask,
    deleteTask
};