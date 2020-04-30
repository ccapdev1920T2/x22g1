
// import module `express`
const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controller/controller.js')

const signUpController = require('../controller/signUpController.js')
const timelineController = require('../controller/timelineController.js')
const createPostController = require('../controller/createPostController.js')

const app = express();

app.get('/favicon.ico', controller.getFavicon);

// call function getIndex when client sends a request for '/' defined in routes.js
app.get('/', controller.getIndex);

app.post('/', controller.postLogIn);

app.get('/checkUsername', controller.checkUsername);

app.get('/checkPassword', controller.checkPassword);

app.get('/signup', signUpController.getSignUp);

app.post('/signup', signUpController.postSignUp);

app.get('/checkEmail', signUpController.checkEmail);

app.get('/checkSignUpUsername', signUpController.checkSignUpUsername);

app.get('/HOME', timelineController.getTimeline);

//app.get('/updateUpvote', timelineController.updateUpvote);

//call function getADMU
app.get('/ADMU', timelineController.getADMU);

app.get('/DLSU', timelineController.getDLSU);

app.get('/UP', timelineController.getUP);

app.get('/UST', timelineController.getUST);

// call function getUserProfile when client requests a username (parameter) che
app.get('/profile/:DisplayName', timelineController.getUserProfile);

app.get('/indivPost', timelineController.getIndivPost);

app.get('/createPost', timelineController.createPost);

// app.get('/check', timelineController.check);

//app.post('/HOME', createPostController.postCreate);

// app.post('/clicked', timelineController.postVotes);

// app.get('/clicks', timelineController.getVotes);

// enables to export app object when called in another .js file
module.exports = app;
