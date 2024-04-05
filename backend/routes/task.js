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

// /projects/:projectId/tasks/:taskId/assign -- Assign a team member to a task
router.put('/:taskId/assign', verifyToken, taskController.assignTask);

// /projects/:projectId/tasks/:taskId/unassign -- Unassign a team member from a task
router.put('/:taskId/unassign', verifyToken, taskController.unassignTask);

// Delete
// /projects/:projectId/tasks/:taskId
router.delete('/:taskId', verifyToken, taskController.deleteTask);

module.exports = router;