// Dependencies
const bcrypt = require('bcrypt');

const User = require('../models/user');

const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const getUserById = async (req, res) => {  
    const userId = req.params.userId;

    // Ensure the requested user ID matches the authenticated user's ID
    if (req.user && req.user.id === userId) {
        User.findById(req.params.userId)
        .then(data => { res.send(data); })
        .catch(error => { res.status(500).send( {message: error.message}); })
    } else {
        res.status(403).send({message: 'You are not authorized to access this resource'});
    }
}

const updateUser = async (req, res) => {
    const userId = req.params.userId;

    // Ensure the requested user ID matches the authenticated user's ID
    if (req.user && req.user.id === userId) {
        try {
            // Check if user exists
            const existingUser = await User.findById(userId);
    
            if(!existingUser) {
                res.status(404).send({message: `Cannot update user with id=${userId}. User not found.`});
            }
    
            // Update user fields
            existingUser.firstName = req.body.firstName || existingUser.firstName;
            existingUser.lastName = req.body.lastName || existingUser.lastName;
            existingUser.email = req.body.email || existingUser.email;
            existingUser.role = req.body.role || existingUser.role;
            
            // Check if password is being changed
            if (req.body.password) {
                // Hash new password
                const salt = await bcrypt.genSalt(10);
                existingUser.password = await bcrypt.hash(req.body.password, salt);
            }
    
            // Save updated user
            const userUpdated = await existingUser.save();
            
            res.status(200).send({message: 'User was updated successfully.', userUpdated});
        } catch (error) {
            res.status(500).send({message: `Cannot update user with id=${userId}.`, error: error.message});
        }
    } else {
        res.status(403).send({message: 'You are not authorized to access this resource'});
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params.userId;

    // Ensure the requested user ID matches the authenticated user's ID
    if (req.user && req.user.id === userId) {
        try {
            // Delete user
            const deletedUser = await User.findByIdAndDelete(userId);
    
            // Check if user was deleted
            if (!deletedUser) {
                res.status(404).send({message: `Cannot delete user with id=${userId}. User not found.`});
            } else {
                res.send({message: 'User was deleted successfully.'});
            }
        } catch (error) {
            res.status(500).send({message: `Cannot delete user with id=${userId}.`, error: error.message});
        }
    } else {
        res.status(403).send({message: 'You are not authorized to access this resource'});
    
    }
}

module.exports = {
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
}