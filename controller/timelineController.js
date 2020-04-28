const db = require('../models/db.js');

const timelineController = {

    // retrieve all posts by finding all documents in collection userPost
    getTimeline: function (req,res) {
        var post = {};
        var query = {Username: req.query.Username};

        var projection = {
            fName: 1,
            lName: 1,
            CreditScore: 1,
            Username: 1,
            DisplayPicture: 1,
        };

        db.findMany('userPost',post,function(posts){
            db.find('userProfile', query, projection, function(userDetails){
                res.render('timeline',{
                    fn: userDetails.fName, 
                    ln: userDetails.lName, 
                    cs: userDetails.CreditScore,
                    image: userDetails.DisplayPicture,
                    posts: posts,
                    username: userDetails.Username
                });
            })
        })
    },

    // getPosts: function (req, res){
    //     var post = {};

    //     db.findMany('userPost',post,function(posts){
    //         res.render('timeline',posts);
    //     })
    // },

    // retrieve all posts with uniBadge '&#127993' by finding all documents in collection userPost
    getDLSU: function (req,res){
        var post = {uniBadge: "&#127993"};
        var query = {Username: req.query.Username};

        var projection = {
            fName: 1,
            lName: 1,
            CreditScore: 1,
            Username: 1
        };

        db.findMany('userPost',post,function(posts){
            db.find('userProfile', query, projection, function(userDetails){
                res.render('timeline',{
                    fn: userDetails.fName, 
                    ln: userDetails.lName, 
                    cs: userDetails.CreditScore,
                    posts: posts,
                    username: userDetails.Username,
                    navbar: "navbar-dlsu"
                });
            })
        })    
    },

    // retrieve all posts with uniBadge '&#x1f985' by finding all documents in collection userPost
    getADMU: function (req,res){
        var post = {uniBadge: "&#x1f985"};
      
        var query = {Username: req.query.Username};

        var projection = {
            fName: 1,
            lName: 1,
            CreditScore: 1,
            Username: 1
        };

        db.findMany('userPost',post,function(posts){
            db.find('userProfile', query, projection, function(userDetails){
                res.render('timeline',{
                    fn: userDetails.fName, 
                    ln: userDetails.lName, 
                    cs: userDetails.CreditScore,
                    posts: posts,
                    username: userDetails.Username,
                    navbar: "navbar-admu"
                });
            })
        })   
    },

    // retrieve all posts with uniBadge '&#99945' by finding all documents in collection userPost
    getUP: function (req,res){
        var post = {uniBadge: "&#9994"};
        
        var query = {Username: req.query.Username};

        var projection = {
            fName: 1,
            lName: 1,
            CreditScore: 1,
            Username: 1
        };

        db.findMany('userPost',post,function(posts){
            db.find('userProfile', query, projection, function(userDetails){
                res.render('timeline',{
                    fn: userDetails.fName, 
                    ln: userDetails.lName, 
                    cs: userDetails.CreditScore,
                    posts: posts,
                    username: userDetails.Username,
                    navbar: "navbar-up"
                });
            })
        })   
    },

    // retrieve all posts with uniBadge '&#128047' by finding all documents in collection userPost
    getUST: function (req,res){
        var post = {uniBadge: "&#128047"};
      
        var query = {Username: req.query.Username};

        var projection = {
            fName: 1,
            lName: 1,
            CreditScore: 1,
            Username: 1
        };

        db.findMany('userPost',post,function(posts){
            db.find('userProfile', query, projection, function(userDetails){
                res.render('timeline',{
                    fn: userDetails.fName, 
                    ln: userDetails.lName, 
                    cs: userDetails.CreditScore,
                    posts: posts,
                    username: userDetails.Username,
                    navbar: "navbar-ust"
                });
            })
        })   
    },

    getIndivPost: function (req, res){
        var postNum = req.params.postNumber;

        var details = {
            postNumber: postNum
        }
    
        db.findOne('userPost', details, function(result){
            res.render('indivpost', result);
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
        // render 'profile.hbs' with the variables based on the result function filtered by the query object
        // db.findOne('userProfile',query,function(result){
        //     res.render('profile',result)
        // });

        var projection = {
            fName: 1,
            lName: 1,
            CreditScore: 1,
            DisplayPicture: 1,
            Username: 1,
            Bio: 1,
        };

        db.findMany('userPost',query,function(posts){
            db.find('userProfile', query, projection, function(userDetails){
               if(userDetails != null){
                    res.render('profile',{
                        fn: userDetails.fName, 
                        ln: userDetails.lName, 
                        cs: userDetails.CreditScore,
                        bio: userDetails.Bio,
                        posts: posts,
                        image: userDetails.DisplayPicture,
                        username: userDetails.Username,
                    });
                }
                else{
                    res.send("error");
                }
            })
        }) 
    }
    
   
    // updateUpvote: function (req,res){
    //     var upvotecount = req.query.Upvotes;
    //     console.log(upvotecount);
    // }

    // postVotes: function(req,res){

    //     var click = {clickTime: new Date()};

    //     db.insertOne('userPost', click, function(result){
    //         console.log('click added to db');
    //     })
    // },

    // getVotes: function(req,res){

    //     var post = {clickTime}

    //     db.find('userPost', post, function(result){
    //         res.send(result);
    //     })

    // }
    
}

module.exports = timelineController;2