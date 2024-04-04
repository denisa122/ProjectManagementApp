// Dependencies
const router = require('express').Router();

const teamController = require('../controllers/teamController');

const {verifyToken} = require('../middlewares/tokenVerification');

// CRUD

// Create
// /api/teams/
router.post('/', teamController.createTeam);

// api/teams/{teamId}/members/:userId -- Add member to team
router.post('/:teamId/members/:userId', teamController.addTeamMemberToTeam);

// Read
// /api/teams/
router.get('/', teamController.getAllTeams);
router.get('/:teamId', teamController.getTeamDetailsById);

// Update
// /api/teams/{teamId}
router.put('/:teamId', teamController.updateTeam);

// Delete
// /api/teams/{teamId}
router.delete('/:teamId', teamController.deleteTeam);

// /api/teams/{teamId}/members/:userId -- Remove member from team
router.delete('/:teamId/members/:userId', teamController.removeTeamMemberFromTeam);

// Export routes
module.exports = router;