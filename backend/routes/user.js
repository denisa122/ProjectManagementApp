// Dependencies
const router = require('express').Router();
const user = require('../models/user');

// CRUD

// Read

// /api/users/    -- Maybe I won't need this route
router.get('/', (req, res) => {
    user.find()
    .then(data => { res.send(data); })
    .catch(error => { res.status(500).send( {message: error.message}); })
});

// /api/users/:userId
router.get('/:userId', (req, res) => {
    user.findById(req.params.userId)
    .then(data => { res.send(data); })
    .catch(error => { res.status(500).send( {message: error.message}); })
});

// Export routes
module.exports = router;