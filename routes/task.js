// Dependencies
const router = require('express').Router();

const taskController = require('../controllers/taskController');

const {verifyToken} = require('../middlewares/tokenVerification');

// CRUD

// Create
// /api/tasks/:projectId
router.post('/:projectId', verifyToken, taskController.createTask);

// Read
// api/tasks/:projectId
router.get('/', verifyToken, taskController.getAllTasksForProject);

// api/tasks/:taskId
router.get('/:taskId', verifyToken, taskController.getTaskDetailsById);

// Update
// api/tasks/:taskId

// api/tasks/:taskId/assign -- Assign a team member to a task
router.put('/:taskId/assign', verifyToken, taskController.assignTask);

// api/tasks/:taskId/unassign -- Unassign a team member from a task
router.put('/:taskId/unassign', verifyToken, taskController.unassignTask);

// Delete
// api/tasks/:taskId
router.delete('/:taskId', verifyToken, taskController.deleteTask);

module.exports = router;