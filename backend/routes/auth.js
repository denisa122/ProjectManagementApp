const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

const {registerValidation} = require('../validation');

// Register
// /api/user/register
router.post('/register', async (req, res) => {
    // Validate user input
    const {error} = registerValidation(req.body);

    if(error) {
        return res.status(400).json({error: error.details[0].message});
    }

    // Check if email is taken
    const emailTaken = await User.findOne({email: req.body.email});

    if(emailTaken) {
        return res.status(400).json({error: 'Email is already taken'});
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    // Create user object and save it in the DB
    const userObject = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: password,
        role: req.body.role
    });

    try {
        const savedUser = await userObject.save();

        // There was no error and we return the user's ID
        res.json({error: null, data: savedUser._id});
    } catch (error) {
        res.status(400).json({error});
    }
});

// Login
// /api/user/login
router.post('/login', async (req, res) => {
    return res.status(200).json({message: 'Login route'});
});

// Logout
// /api/user/logout
router.post('/logout', async (req, res) => {

});

module.exports = router;