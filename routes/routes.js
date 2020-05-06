// import module `express`
const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controller/controller.js');

const signUpController = require('../controller/signUpController.js');
const timelineController = require('../controller/timelineController.js');
const createPostController = require('../controller/createPostController.js');
const profileController = require('../controller/profileController.js');

const app = express();

app.get('/favicon.ico', controller.getFavicon);

// call function getIndex when client sends a request for '/' defined in routes.js
// controller
app.get('/', controller.getIndex);

app.post('/', controller.postLogIn);

app.get('/checkUsername', controller.checkUsername);

app.get('/checkPassword', controller.checkPassword);

// signUpController

app.get('/signup', signUpController.getSignUp);

app.post('/signup', signUpController.postSignUp);

app.get('/checkEmail', signUpController.checkEmail);

app.get('/checkSignUpUsername', signUpController.checkSignUpUsername);

// timelineController

app.get('/HOME', timelineController.getTimeline);

app.get('/createPost', timelineController.createPost);

app.get('/indivPost', timelineController.getIndivPost);

app.post('/uploadphoto', timelineController.uploadPhoto);

app.get('/createPost', timelineController.createPost);

app.get('/createComment', timelineController.createComment);


// timelineController for Universities
app.get('/ADMU', timelineController.getADMU);

app.get('/DLSU', timelineController.getDLSU);

app.get('/UP', timelineController.getUP);

app.get('/UST', timelineController.getUST);

app.get('/getStatus', timelineController.getStatus);

app.get('/insertStatus', timelineController.insertStatus);

app.get('/updateStatus', timelineController.updateStatus);

// profileController
app.get('/profile/:DisplayName', profileController.getUserProfile);

app.get('/editprofile/:DisplayName', profileController.editProfile);

app.get('/editprofile/:DisplayName', profileController.updateProfile);

//app.get('/updateUpvote', timelineController.updateUpvote);

// call function getUserProfile when client requests a username (parameter) che

// app.get('/check', timelineController.check);

//app.post('/HOME', createPostController.postCreate);

// app.post('/clicked', timelineController.postVotes);

// app.get('/clicks', timelineController.getVotes);

// enables to export app object when called in another .js file
module.exports = app;
