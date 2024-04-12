// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

require('dotenv-flow').config();

app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const teamRoutes = require('./routes/team');
const projectRoutes = require('./routes/project');
const taskRoutes = require('./routes/task');

// CRUD
app.use('/api/user', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/projects/:projectId/tasks', taskRoutes);

// For Render (health check path)
app.get('/api/welcome', (req, res) => {
    res.status(200).send('Welcome to the Project Management API');
});

mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

const PORT = process.env.PORT || 5000;

// Start up the server
app.listen(PORT, function() {
    console.log('Server is running on Port:', PORT);
})

// Connect to MongoDB
mongoose.connect
(
    process.env.DBHOST,
    {

    }
).catch(error => console.log("Error connecting to MongoDB: ", error));

// Serve static files from the "frontend_temporary" folder
app.use(express.static(path.join(__dirname, "../frontend_temporary")));

// Set index.html as the default page (temporary)
app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "../frontend_temporary/index.html"));
})

// Export app as a module
module.exports = app;