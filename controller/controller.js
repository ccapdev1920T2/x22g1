// import module from db.js in models directory
const db = require('../models/db.js');

//import user module
const User = require('../models/userModels.js');

// import userposts module
const Posts = require('../models/UserPostModels.js');

// import usercomments module
const Comments = require('../models/UserCommentModels.js');

// define objects for client request functions for a certain path in the server
const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    // render log-in page when client requests '/' defined in routes.js
    getIndex: function(req,res){
        res.render('login');
    },

    //executed when client requests '/' for HTTP POST defined in routes.js
    postLogIn: function(req, res){
        var Username = req.body.username;

        var query = {
            Username: Username,
        }

        db.findOne(User,query,function(result){
            if(result){
                res.redirect('/HOME?Username=' + Username);
            }
        })
    },

    // executes when client request for HTTP GET '/checkUsername' defined in routes.js
    checkUsername: function(req,res){

        // retrieve value of Username stored in req.query object
        var username = req.query.Username;

        // call the function findOne() from the module in db.js and use the object query to filter the collection 'userProfile' in the database
        // sends an empty string if no result was found. otherwise, send an object containing 'Username'
        db.findOne(User, {Username : username}, function(result){
            res.send(result);
        })


        // mongoose
        // db.findOne(User, {username: username}, 'username', function (result) {
        //     res.send(result);
        // });
    },

    checkPassword: function(req,res){

        // retrieve value of Username stored in req.query object
        var pass = req.query.Password;

        // call the function findOne() from the module in db.js and use the object query to filter the collection 'userProfile' in the database
        // sends an empty string if no result was found. otherwise, send an object containing 'Username'
        db.findOne(User, {Password : pass}, function(result){
            res.send(result);
        })

    },

    // retrieve user profile based on the username request of the client defined in routes.js
    getUserProfile: function(req,res){
        
        // retrieve the username parameter from the URL
        var u = req.params.Username;

        // assign the retrieved username as an object 'query'
        var query = {
            Username: u
        };

        // call the function findOne() from the module in db.js and use the object query to filter the collection 'userProfile' in the database
        db.findOne(User,query,function(result){

            // render 'profile.hbs' with the variables based on the result function filtered by the query object
            res.render('profile',result)
        });
    }
}

 // enables to export controller object when called in another .js file
 module.exports = controller;