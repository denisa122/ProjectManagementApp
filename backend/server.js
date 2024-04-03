// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

require('dotenv-flow').config();

// Routes
app.get("/api/welcome", (req, res) => {
    res.status(200).send("Welcome to the Express API!");
});

mongoose.connect
(
    process.env.DBHOST,
    {

    }
).catch(error => console.log("Error connecting to MongoDB: ", error));

mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

const PORT = process.env.PORT || 4000;

// Start up the server
app.listen(PORT, function() {
    console.log('Server is running on Port:', PORT);
})

module.exports = app;