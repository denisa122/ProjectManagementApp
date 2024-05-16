const router = require('express').Router();

const teamController = require('../controllers/teamController');

const {verifyToken} = require('../middlewares/tokenVerification');

// CRUD

// Create
// /api/teams/
router.post('/', verifyToken, teamController.createTeam);

// api/teams/:teamId/members/:userId -- Add member to team
router.post('/:teamId/members/:userId', verifyToken, teamController.addTeamMemberToTeam);

// Read
// /api/teams/ -- Maybe I won't need this route
router.get('/', teamController.getAllTeams);

// /api/teams/:teamId
router.get('/:teamId', verifyToken, teamController.getTeamDetailsById);

// /api/teams/leader/:userId
router.get('/leader/:userId', verifyToken, teamController.getTeamsByLeader);

// Update
// /api/teams/:teamId
router.put('/:teamId', verifyToken, teamController.updateTeam);

// Delete
// /api/teams/:teamId
router.delete('/:teamId', verifyToken, teamController.deleteTeam);

// /api/teams/:teamId/members/:userId -- Remove member from team
router.delete('/:teamId/members/:userId', verifyToken, teamController.removeTeamMemberFromTeam);

// Export routes
module.exports = router;