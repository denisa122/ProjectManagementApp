// Dependencies
const router = require('express').Router();

const projectController = require('../controllers/projectController');

const {verifyToken} = require('../middlewares/tokenVerification');

// CRUD

// Create
// /api/projects/

// Read
// /api/projects/:teamId

// /api/projects/:projectId

// /api/projects/:projectId/members

// Update
// /api/projects/:projectId

// Delete
// /api/projects/:projectId