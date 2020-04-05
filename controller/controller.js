// import module from db.js in models directory
const db = require('../models/db.js');

// define objects for client request functions for a certain path in the server
const controller = {

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

    getTimeline: function (req, res) {
        res.render('timeline');
    },

    getADMU: function (req, res){
        res.render('timelineADMU');
    }

}

 // enables to export controller object when called in another .js file
 module.exports = controller;