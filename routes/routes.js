
// import module `express`
const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controller/controller.js')

const app = express();

// call function getUserProfile when client requests a username (parameter) 
app.get('/:Username', controller.getUserProfile);

app.get('/timeline', controller.getTimeline);

//call function getADMUTL 
app.get('/ADMU', controller.getADMU);


// enables to export app object when called in another .js file
module.exports = app;
