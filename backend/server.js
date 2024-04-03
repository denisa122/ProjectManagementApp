// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

require('dotenv-flow').config();

app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// CRUD
app.use('/api/user', authRoutes);
app.use('/api/users', userRoutes);

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

// Export app as a module
module.exports = app;