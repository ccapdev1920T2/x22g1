// import express module
const express = require('express');
const app = express();

// import controller module
const controller = require('../controller/controller.js');

// call function getProfile() from controller module if client requested a username (parameter) in the URL
app.get('/:Username', controller.getUserProfile);

// enables to export app object when called in another .js file
module.exports = app;