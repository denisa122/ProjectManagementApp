//Dependencies


const Team = require('../models/team');
const User = require('../models/user');


const createTeam = async (req, res) => {
    data = req.body;

    Team.insertMany(data)
    .then(data => { res.send(data); })
    .catch(error => { res.status(500).send( {message: error.message}); })
}


const addTeamMemberToTeam = async (req, res) => {
    const teamId = req.params.teamId;
    const userId = req.params.userId;

    try {
        const team = await Team.findById(teamId);

        if (!team) {
            res.status(404).send({message: `Team with id=${teamId} not found.`});
            return;
        }

        // Check if the user already exists in the team
        if (team.members.includes(userId)) {
            res.status(400).send({message: `User with id=${userId} is already a member of the team.`});
            return;
        }

        // Add the member to the team
        team.members.push(userId);

        const updateTeam = await team.save();
        await Team.populate(updateTeam, {path: 'members', select: 'firstName lastName'});
        await Team.populate(updateTeam, {path: 'teamLeader', select: 'firstName lastName'});
        
        res.send(updateTeam);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
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

const updateTeam = async (req, res) => {

}

const deleteTeam = async (req, res) => {

}

const removeTeamMemberFromTeam = async (req, res) => {

}

module.exports = {
    createTeam,
    addTeamMemberToTeam,
    getAllTeams,
    getTeamDetailsById,
}