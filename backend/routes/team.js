// Dependencies
const router = require('express').Router();

const teamController = require('../controllers/teamController');

const {verifyToken} = require('../middlewares/tokenVerification');

// CRUD

// Create
router.post('/', teamController.createTeam);

// Read
// /api/teams/
router.get('/', teamController.getAllTeams);
router.get('/:teamId', teamController.getTeamDetailsById);

// Export routes
module.exports = router;