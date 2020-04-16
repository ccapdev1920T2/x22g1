
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

app.get('/signup', signUpController.getSignUp);

// app.post('/signup', signupController.postSignUp);

app.get('/checkEmail', controller.checkEmail);

app.get('/HOME', timelineController.getTimeline);

app.get('/getSideProfile', timelineController.getSideProfile)

//call function getADMU
app.get('/ADMU', timelineController.getADMU);

app.get('/DLSU', timelineController.getDLSU);

app.get('/UP', timelineController.getUP);

app.get('/UST', timelineController.getUST);

app.get('/indivPost/:postNumber', timelineController.getIndiv);

// call function getUserProfile when client requests a username (parameter) 
app.get('/profile/:Username', controller.getUserProfile);

// enables to export app object when called in another .js file
module.exports = app;
