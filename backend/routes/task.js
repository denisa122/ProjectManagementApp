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
router.get('/', verifyToken, taskController.getAllTasksForProject);

// /projects/:projectId/tasks/:taskId
router.get('/:taskId', verifyToken, taskController.getTaskDetailsById);

// Update
// /projects/:projectId/tasks/:taskId

// Delete
// /projects/:projectId/tasks/:taskId
router.delete('/:taskId', verifyToken, taskController.deleteTask);

module.exports = router;