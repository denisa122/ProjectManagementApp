// Dependencies
const Project = require('../models/project');
const ProjectTemplate = require('../models/projectTemplate');
const Team = require('../models/team');

const createProjectTemplate = async (req, res) => {
    try {
        const {
            name,
            description,
            startDate,
            endDate,
            projectStatus,
            members,
            currentSprint,
            tasks
        } = req.body;

        const projectTemplate = new ProjectTemplate({
            name,
            description,
            startDate,
            endDate,
            projectStatus,
            members,
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
        const members = req.body.members;
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
            members: template.members,
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
            members,
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

};

const getProjectDetailsById = async (req, res) => {

};

const getTeamMembersByProjectId = async (req, res) => {

};

const updateProject = async (req, res) => {

};

const deleteProject = async (req, res) => {

};  

module.exports = {
    createProjectTemplate,
    createProject,
    getAllProjectsForTeam,
    getProjectDetailsById,
    getTeamMembersByProjectId,
    updateProject,
    deleteProject
}