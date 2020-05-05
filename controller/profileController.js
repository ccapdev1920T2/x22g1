const db = require('../models/db.js');
const ObjectId = require('mongodb').ObjectID;

const profileController = {
    // retrieve user profile based on the username request of the client defined in routes.js
    getUserProfile: function(req,res){
            
        // retrieve the username parameter from the URL
        var u = req.params.DisplayName;

        // assign the retrieved username as an object 'query'
        var querypost = {
            Username: u
        };

        var queryuser = {
            DisplayName: u
        }

        var projection = {
            fName: 1,
            lName: 1,
            CreditScore: 1,
            DisplayPicture: 1,
            DisplayName: 1,
            Bio: 1,
        };

        
        // call the function findOne() from the module in db.js and use the object query to filter the collection 'userProfile' in the database
        // render 'profile.hbs' with the variables based on the result function filtered by the query object
        db.findMany('userPost',querypost,function(posts){
            db.find('userProfile', queryuser, projection, function(userDetails){
            if(userDetails != null){
                    res.render('profile',{
                        fn: userDetails.fName, 
                        ln: userDetails.lName, 
                        cs: userDetails.CreditScore,
                        bio: userDetails.Bio,
                        posts: posts,
                        image: userDetails.DisplayPicture,
                        DisplayName: userDetails.DisplayName,
                    });
                }
                else{
                    res.send("error");
                }
            })
        }) 
    },

    // edit profile details
    editProfile: function(req,res){
        // retrieve the username parameter from the URL
        var u = req.params.DisplayName;

        // assign the retrieved username as an object 'query'
        var querypost = {
            Username: u
        };

        var queryuser = {
            DisplayName: u
        }

        var projection = {
            fName: 1,
            lName: 1,
            CreditScore: 1,
            DisplayPicture: 1,
            DisplayName: 1,
            Bio: 1,
        };

        // call the function findOne() from the module in db.js and use the object query to filter the collection 'userProfile' in the database
        // render 'profile.hbs' with the variables based on the result function filtered by the query object
        db.findMany('userPost',querypost,function(posts){
            db.find('userProfile', queryuser, projection, function(userDetails){
            if(userDetails != null){
                    res.render('partials/editprofile',{
                        fn: userDetails.fName, 
                        ln: userDetails.lName, 
                        cs: userDetails.CreditScore,
                        bio: userDetails.Bio,
                        posts: posts,
                        image: userDetails.DisplayPicture,
                        DisplayName: userDetails.DisplayName,
                    });
                }
                else{
                    res.send("error");
                }
            })
        }) 

    }
}

module.exports = profileController;
