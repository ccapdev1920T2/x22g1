// IMPORT
const express = require('express'); //EXPRESS
const session = require('express-session'); //EXPRESS-SESSIONS
const database = require('../models/db.js'); //CONNECT DB

const cookieParser = require('cookie-parser'); //COOKIES
const bodyParser = require('body-parser'); //BODY PARSING
var multer = require('multer'); //FILE UPLOAD
const validation = require('../helpers/validation.js'); //FORM VALIDATION

// import login controller
const loginController = require('../controllers/loginController.js');

// import sign up controller
const signUpController = require('../controllers/signUpController.js');

// import timeline controller
const timelineController = require('../controllers/timelineController.js');
const indivpostController = require('../controllers/indivpostController.js');
const createPostController = require('../controllers/createPostController.js');

// import profile controller
const profileController = require('../controllers/profileController.js');

const app = express();

// initialize multer for file upload use 
var storage = multer.diskStorage({
    destination: function (req, file, cd) {
        if (file.fieldname === 'avatar') {
            cd(null, './public/avatars');
        }
    },
    filename: function (req, file, cd) {
        cd(null, file.originalname);
    },
});

var upload = multer({ storage: storage });
var uploadFilter = upload.fields([
    { name: 'avatar', maxCount: 1 },
]);

// Init Cookie and Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Init Sessions
app.use(
    session({
        key: 'user_sid', //user session id
        secret: 'lifecouldbedream',
        resave: false,
        saveUninitialized: true,
        store: database.sessionStore,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 Day.
        },
    }),
);

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});


// loginController
app.get('/favicon.ico', loginController.getFavicon);
app.get('/', loginController.getLogIn);
app.post('/', loginController.postLogIn);

// signUpController
app.get('/signup', signUpController.getSignUp);
app.post('/signup', 
    uploadFilter,
    validation.signupValidation(),
    signUpController.postSignUp
);

// timelineController
app.get('/timeline', timelineController.getTimeline);
app.post('/createPost', 
    validation.createPostValidation(),
    timelineController.createPost);
app.get('/timeline/dlsu', timelineController.getDLSU);
app.get('/timeline/admu', timelineController.getADMU);
app.get('/timeline/up', timelineController.getUP);
app.get('/timeline/ust', timelineController.getUST);


// app.post('/uploadphoto', timelineController.uploadImage);

// indivpostController
app.get('/indivPost', indivpostController.getIndivPost);
app.get('/createComment', indivpostController.createComment);

// timelineController for Universities
// app.get('/ADMU', timelineController.getADMU);
// app.get('/DLSU', timelineController.getDLSU);
// app.get('/UP', timelineController.getUP);
// app.get('/UST', timelineController.getUST);
app.get('/getStatus', timelineController.getStatus);
app.get('/insertStatus', timelineController.insertStatus);
app.get('/updateStatus', timelineController.updateStatus);

// profileController
app.get('/profile/:DisplayName', profileController.getUserProfile);
app.get('/editprofile/:DisplayName', profileController.editProfile);
app.get('/editprofile/:DisplayName', profileController.updateProfile);

//logout
app.get('/logout', function (req, res) {
    req.logout;
    req.session.destroy(function (err) {});
    res.redirect('/');
});

//app.get('/updateUpvote', timelineController.updateUpvote);

// call function getUserProfile when client requests a username (parameter) che

// app.get('/check', timelineController.check);

//app.post('/HOME', createPostController.postCreate);

// app.post('/clicked', timelineController.postVotes);

// app.get('/clicks', timelineController.getVotes);

// enables to export app object when called in another .js file
module.exports = app;
