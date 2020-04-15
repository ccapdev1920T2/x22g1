// import module from db.js in models directory
const db = require('../models/db.js');

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

        
        var username = req.body.username;

        var query = {
            Username: username,
        }

        db.findOne('userProfile',query,function(result){
            if(result){
                res.redirect('/HOME?username=' + username);
            }
        })
    },

    // executes when client request for HTTP GET '/checkUsername' defined in routes.js
    checkUsername: function(req,res){

        // retrieve value of Username stored in req.query object
        var username = req.query.Username;

        // call the function findOne() from the module in db.js and use the object query to filter the collection 'userProfile' in the database
        // sends an empty string if no result was found. otherwise, send an object containing 'Username'
        db.findOne('userProfile', {Username : username}, function(result){
            res.send(result);
        })
    },

    checkPassword: function(req,res){

        // retrieve value of Username stored in req.query object
        var pass = req.query.Password;

        // call the function findOne() from the module in db.js and use the object query to filter the collection 'userProfile' in the database
        // sends an empty string if no result was found. otherwise, send an object containing 'Username'
        db.findOne('userProfile', {Password : pass}, function(result){
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
        db.findOne('userProfile',query,function(result){

            // render 'profile.hbs' with the variables based on the result function filtered by the query object
            res.render('profile',result)
        });
    },

    // retrieve all posts by finding all documents in collection userPost
    

    getDLSU: function (req,res) {
        var post = {uniBadge: "&#127993"};
      
        db.findMany('userPost', post, function(result){
            res.render('timeline',result);
        })
        
    },

    getADMU: function (req,res){
        var post = {uniBadge: "&#x1f985"};
      
        db.findMany('userPost', post, function(result){
            res.render('timeline',result);
        })
    },

    getUP: function (req,res){
        var post = {uniBadge: "&#9994"};
      
        db.findMany('userPost', post, function(result){
            res.render('timeline',result);
        })
    },

    getUST: function (req,res){
        var post = {uniBadge: "&#128047"};
      
        db.findMany('userPost', post, function(result){
            res.render('timeline',result);
        })
    }
}

 // enables to export controller object when called in another .js file
 module.exports = controller;