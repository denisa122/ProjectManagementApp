const router = require('express').Router();
const authController = require('../controllers/authController');

// Register
// /api/user/register
router.post('/register', authController.register);

// // Login
// // /api/user/login
router.post('/login', authController.login);

// Logout -- TO DO: IMPLEMENT
// /api/user/logout 
router.post('/logout', async (req, res) => {

});

module.exports = router;