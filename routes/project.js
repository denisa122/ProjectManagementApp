const router = require('express').Router();

const projectController = require('../controllers/projectController');

const {verifyToken} = require('../middlewares/tokenVerification');

// CRUD

// Create
// /api/projects/templates -- This won't be available to any user (it's just to create the template in the db)
router.post('/templates', projectController.createProjectTemplate);

// /api/projects/
router.post('/', verifyToken, projectController.createProject);

// Read
// /api/projects/:projectId
router.get('/:projectId', verifyToken, projectController.getProjectDetailsById);

// /api/projects/team/:teamId
router.get('/team/:teamId', verifyToken, projectController.getAllProjectsForTeam);

// /api/projects/users/:userId    
// Maybe it should be projects/team/{teamId}/users/{userId
router.get('/users/:userId', verifyToken, projectController.getAllProjectsForUser);

// Update
// /api/projects/:projectId
router.put('/:projectId', verifyToken, projectController.updateProject);

// Delete
// /api/projects/:projectId
router.delete('/:projectId', verifyToken, projectController.deleteProject);

module.exports = router;