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

// Export routes
module.exports = router;