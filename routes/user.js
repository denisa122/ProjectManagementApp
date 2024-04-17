// Dependencies
const router = require('express').Router();

const userController = require('../controllers/userController');

const {verifyToken} = require('../middlewares/tokenVerification');

// CRUD

// Read
// /api/users/    -- Maybe I won't need this route
router.get('/', userController.getAllUser);

// // /api/users/:userId
router.get('/:userId', verifyToken, userController.getUserById);

// // Update
// // /api/users/:userId
router.put('/:userId', verifyToken, userController.updateUser);

// // Delete
router.delete('/:userId', verifyToken, userController.deleteUser);

// Export routes
module.exports = router;