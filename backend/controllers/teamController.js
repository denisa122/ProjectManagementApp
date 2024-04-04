//Dependencies


const Team = require('../models/team');


const createTeam = async (req, res) => {
    data = req.body;

    Team.insertMany(data)
    .then(data => { res.send(data); })
    .catch(error => { res.status(500).send( {message: error.message}); })
}

const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find()
        .populate('teamLeader', 'firstName lastName')
        .populate('members', 'firstName lastName');

        res.send(teams);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

const getTeamDetailsById = async (req, res) => {
    const teamId = req.params.teamId;

    try {
        const team = await Team.findById(teamId)
        .populate('teamLeader', 'firstName lastName')
        .populate('members', 'firstName lastName');

        if (!team) {
            res.status(404).send({message: `Team with id=${teamId} not found.`});
        } else {
            res.send(team);
        }
    } catch {
        res.status(500).send({message: `Error retrieving team with id=${teamId}.`});
    }
};

const addTeamMemberToTeam = async (req, res) => {

}

const updateTeam = async (req, res) => {

}

const deleteTeam = async (req, res) => {

}

const removeTeamMemberFromTeam = async (req, res) => {

}

module.exports = {
    createTeam,
    getAllTeams,
    getTeamDetailsById,
}