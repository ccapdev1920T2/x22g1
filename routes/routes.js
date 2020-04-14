
// import module `express`
const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controller/controller.js')

const ADMUController = require('../controller/ADMUController.js')

const app = express();

app.get('/favicon.ico', controller.getFavicon);

// call function getIndex when client sends a request for '/' defined in routes.js
app.get('/', controller.getIndex);

// call function getUserProfile when client requests a username (parameter) 
app.get('/:Username', controller.getUserProfile);

//app.get('/', controller.getTimeline);

app.get('/DLSU', controller.getDLSU);

//call function getADMUTL 
app.get('/ADMU', ADMUController.getADMU);


// enables to export app object when called in another .js file
module.exports = app;
