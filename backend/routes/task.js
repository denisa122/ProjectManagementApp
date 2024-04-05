// Dependencies
const router = require('express').Router();

const taskController = require('../controllers/taskController');

const {verifyToken} = require('../middlewares/tokenVerification');

// CRUD

// Create
// /api/projects/:projectId/tasks/
router.post('/', verifyToken, taskController.createTask);

// Read
// /projects/:projectId/tasks

// /projects/:projectId/tasks/:taskId

// Update
// /projects/:projectId/tasks/:taskId

// Delete
// /projects/:projectId/tasks/:taskId

module.exports = router;