const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const {registerValidation, loginValidation} = require('../validation');
// const {verifyToken} = require('../middlewares/tokenVerification');

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
    // Validate user login credentials
    const {error} = loginValidation(req.body);

    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }

    // Login valid -- find the user
    const user = await User.findOne({email: req.body.email});

    // Error if email is wrong (user not in DB)
    if (!user) {
        return res.status(400).json({error: 'Incorrect email or password'});
    }

    // User exists -- check password
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    // Error if password is wrong
    if(!validPassword) {
        return res.status(400).json({error: 'Incorrect email or password'});
    }
    
    // Create and assign a token with email and id
    const token = jwt.sign 
    (
        {
            email: user.email,
            id: user._id
        },
        process.env.TOKEN_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN},
    );

    // Attach token to header
    res.header('auth-token', token).json({
        error: null, 
        data: {token}
    });
});

// Logout
// /api/user/logout
router.post('/logout', async (req, res) => {

});

module.exports = router;