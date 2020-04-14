
// import module `express`
const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controller/controller.js')

const ADMUController = require('../controller/ADMUController.js')

const app = express();

app.get('/favicon.ico', controller.getFavicon);

// call function getIndex when client sends a request for '/' defined in routes.js
app.get('/', controller.getIndex);

app.post('/',controller.postLogIn);

app.get('/HOME', controller.getTimeline);

//call function getADMUTL 
app.get('/ADMU', controller.getADMU);

app.get('/DLSU', controller.getDLSU);

app.get('/UP', controller.getUP);

app.get('/UST', controller.getUST);

// call function getUserProfile when client requests a username (parameter) 
app.get('/:Username', controller.getUserProfile);

// enables to export app object when called in another .js file
module.exports = app;
