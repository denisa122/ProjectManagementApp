// Dependencies
const Project = require('../models/project');
const ProjectTemplate = require('../models/projectTemplate');

const Team = require('../models/team');
const Task = require('../models/task');
const Sprint = require('../models/sprint');

const createProjectTemplate = async (req, res) => {
    try {
        const {
            name,
            description,
            startDate,
            endDate,
            projectStatus,
            team,
            currentSprint,
            tasks
        } = req.body;

        const projectTemplate = new ProjectTemplate({
            name,
            description,
            startDate,
            endDate,
            projectStatus,
            team,
            currentSprint,
            tasks
        });

        const savedTemplate = await projectTemplate.save();

        res.status(201).json(savedTemplate);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createProject = async (req, res) => {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const projectStatus = req.body.projectStatus;
        const team = req.body.team;
        const currentSprint = req.body.currentSprint;
        const tasks = req.body.tasks;
        const templateId = req.body.templateId;


        // Check if template Id is provided
        if (templateId) {
            const template = await ProjectTemplate.findById(templateId);
            if (!template) {
                return res.status(400).json({message: 'Invalid template Id'});
            } 
            // Create project using template
            const project = new Project({
            name: name || template.name,
            description: description || template.description,
            startDate: template.startDate,
            endDate: template.endDate,
            projectStatus: template.projectStatus,
            team: template.team,
            currentSprint: template.currentSprint,
            tasks: template.tasks
        });

        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } else {
        // Create blank project
        const project = new Project({
            name,
            description,
            startDate,
            endDate,
            projectStatus,
            team,
            currentSprint,
            tasks
        });

        const savedProject = await project.save();
        res.status(201).json(savedProject);
    }
    } catch (error) {
        res.status(500).json({message: error.message});
    }    
};

const getAllProjectsForTeam = async (req, res) => {
    const teamId = req.params.teamId;

    try {
        const projects = await Project.find({team: teamId});

        res.send(projects);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getAllProjectsForUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find teams where the user is a member or leader
        const teams = await Team.find({$or: [{teamLeader: userId}, {members: userId}]});
        const teamIds = teams.map(team => team._id);
        
        // Find projects associated with the teams
        const projects = await Project.find({team: {$in: teamIds}});

        res.send(projects);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getProjectDetailsById = async (req, res) => {
    const projectId = req.params.projectId;

    try {
        const project = await Project.findById(projectId)
            .populate('team', 'name teamLeader members')
            .populate('currentSprint', 'name startDate endDate')
            .populate('tasks', 'name description');

        if (!project) {
            return res.status(404).json({message: 'Project not found'});
        }

        res.send(project);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateProject = async (req, res) => {
    const projectId = req.params.projectId;
    const updateData = req.body;

    try {
        const project = await Project.findById(projectId);
         if (!project) {
            return res.status(404).json({message: 'Project not found'});
        }

        // Prevent updating templateId
        delete updateData.templateId;

        Object.assign(project, updateData);

        const updatedProject = await project.save();
        await Project.populate(updatedProject, {
            path: 'team',
            populate: {
                path: 'teamLeader',
                select: 'firstName lastName role'
            }
        });
        await Project.populate(updatedProject, {
            path: 'team.members',
            select: 'firstName lastName'
        });
        await Project.populate(updatedProject, {path: 'currentSprint', select: 'name startDate endDate'});

        res.send(updatedProject);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteProject = async (req, res) => {
    const projectId = req.params.projectId;

    try {
        const deletedProject = await Project.findByIdAndDelete(projectId);

        if (!deletedProject) {
            return res.status(404).json({message: 'Project not found'});
        }

        res.send({message: `Project deleted successfully.`});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};  

// For the DE assignment (remove after)
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
        .populate({
            path: 'team',
            populate: [
                {path: 'teamLeader', select: 'firstName lastName role'},
                {path: 'members', select: 'firstName lastName'}
            ]
        });
        res.send(projects);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    createProjectTemplate,
    createProject,
    getAllProjectsForTeam,
    getAllProjectsForUser,
    getProjectDetailsById,
    updateProject,
    deleteProject,

    getAllProjects
}