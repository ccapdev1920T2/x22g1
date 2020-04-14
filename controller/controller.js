// import module from db.js in models directory
const db = require('../models/db.js');

// define objects for client request functions for a certain path in the server
const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function(req,res){

        res.render('login');
    },

    // retrieve user profile based on the username request of the client defined in routes.js
    getUserProfile: function(req,res){
        
        // retrieve the username parameter from the URL
        var u = req.params.Username;

        // assign the retrieved username as an object 'query'
        var query = {
            Username: u
        };

        // call the function findOne() from the module in models directory and use the object query to filter the collection 'userProfile' in the database
        db.findOne('userProfile',query,function(result){

            // render 'profile.hbs' with the variables based on the result function filtered by the query object
            res.render('profile',result)
        });
    },

    // retrieve all posts by finding all documents in collection userPost
    getTimeline: function (req,res) {
        var post = {};
      
        db.findMany('userPost',post,function(result){
            res.render('timeline',result);
        })
    },

    getDLSU: function (req,res) {
        // var post = {};
      
        // db.findMany('userPost',post,function(result){
        //     res.render('timelineDLSU',result);
        // })
        res.render('timelineDLSU');
    },

    getADMU: function (req,res){
        // var post = {};

        // db.findMany('userPost',post,function(result){
        //     res.render('timelineADMU',result);
        // })

        res.render('timelineADMU');
    }
}

 // enables to export controller object when called in another .js file
 module.exports = controller;