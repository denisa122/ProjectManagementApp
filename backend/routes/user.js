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

// Update

// /api/users/:userId
router.put('/:userId', (req, res) => {
    const userId = req.params.userId;

    user.findByIdAndUpdate(userId, req.body)
    .then(data => {
        if(!data) {
            res.status(404).send({message: `Cannot update user with id=${userId}. User not found.`});
        } else {
            res.send({message: 'User was updated successfully.'});
        }
    })
    .catch(error => { res.status(500).send( {message: `Cannot update user with id=${userId}.`}); })
});

// Delete

// /api/users/:userId
router.delete('/:userId', (req, res) => {
    const userId = req.params.userId;

    user.findByIdAndDelete(userId)
    .then(data => {
        if(!data) {
            res.status(404).send({message: `Cannot delete user with id=${userId}. User not found.`});
        } else {
            res.send({message: 'User was deleted successfully.'});
        }
    })
    .catch(error => { res.status(500).send( {message: `Cannot delete user with id=${userId}.`}); })
});

// Export routes
module.exports = router;