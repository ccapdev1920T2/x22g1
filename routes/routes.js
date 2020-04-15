
// import module `express`
const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controller/controller.js')

const signUpController = require('../controller/signUpController.js')
const timelineController = require('../controller/timelineController.js')

const app = express();

app.get('/favicon.ico', controller.getFavicon);

// call function getIndex when client sends a request for '/' defined in routes.js
app.get('/', controller.getIndex);

app.post('/', controller.postLogIn);

app.get('/checkUsername', controller.checkUsername);

app.get('/checkPassword', controller.checkPassword);

//app.post('/',controller.postLogIn);

app.get('/signup', signUpController.getSignUp);

app.get('/HOME', timelineController.getTimeline);

//call function getADMUTL 
app.get('/ADMU', controller.getADMU);

app.get('/DLSU', controller.getDLSU);

app.get('/UP', controller.getUP);

app.get('/UST', controller.getUST);

// call function getUserProfile when client requests a username (parameter) 
app.get('/:Username', controller.getUserProfile);

// enables to export app object when called in another .js file
module.exports = app;
