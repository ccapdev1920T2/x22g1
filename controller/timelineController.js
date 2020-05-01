const db = require('../models/db.js');
const ObjectId = require('mongodb').ObjectID;

const timelineController = {

    // retrieve all posts by finding all documents in collection userPost
    getTimeline: function (req,res) {
        var post = {};
        var query = {DisplayName: req.query.DisplayName};

        var projection = {
            fName: 1,
            lName: 1,
            CreditScore: 1,
            DisplayName: 1,
            DisplayPicture: 1,
        };

        var update = {$set: {"User": req.query.DisplayName}}
        db.updateMany('userPost', post, update);

        db.findMany('userPost',post,function(posts){
            db.find('userProfile', query, projection, function(userDetails){
                res.render('timeline',{
                    fn: userDetails.fName, 
                    ln: userDetails.lName, 
                    cs: userDetails.CreditScore,
                    image: userDetails.DisplayPicture,
                    posts: posts,
                    DisplayName: req.query.DisplayName,
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
        var query = {DisplayName: req.query.DisplayName};

        var projection = {
            fName: 1,
            lName: 1,
            CreditScore: 1,
            DisplayName: 1,
            DisplayPicture: 1,
        };

        db.findMany('userPost',post,function(posts){
            db.find('userProfile', query, projection, function(userDetails){
                res.render('timeline',{
                    fn: userDetails.fName, 
                    ln: userDetails.lName, 
                    cs: userDetails.CreditScore,
                    posts: posts,
                    image: userDetails.DisplayPicture,
                    DisplayName: userDetails.DisplayName,
                    navbar: "navbar-dlsu"
                });
            })
        })    
    },

    // retrieve all posts with uniBadge '&#x1f985' by finding all documents in collection userPost
    getADMU: function (req,res){
        var post = {uniBadge: "&#x1f985"};
      
        var query = {DisplayName: req.query.DisplayName};

        var projection = {
            fName: 1,
            lName: 1,
            CreditScore: 1,
            DisplayName: 1,
            DisplayPicture: 1,
        };

        db.findMany('userPost',post,function(posts){
            db.find('userProfile', query, projection, function(userDetails){
                res.render('timeline',{
                    fn: userDetails.fName, 
                    ln: userDetails.lName, 
                    cs: userDetails.CreditScore,
                    posts: posts,
                    image: userDetails.DisplayPicture,
                    DisplayName: userDetails.DisplayName,
                    navbar: "navbar-admu"
                });
            })
        })   
    },

    // retrieve all posts with uniBadge '&#99945' by finding all documents in collection userPost
    getUP: function (req,res){
        var post = {uniBadge: "&#9994"};
        
        var query = {DisplayName: req.query.DisplayName};

        var projection = {
            fName: 1,
            lName: 1,
            CreditScore: 1,
            DisplayName: 1,
            DisplayPicture: 1,
        };

        db.findMany('userPost',post,function(posts){
            db.find('userProfile', query, projection, function(userDetails){
                res.render('timeline',{
                    fn: userDetails.fName, 
                    ln: userDetails.lName, 
                    cs: userDetails.CreditScore,
                    posts: posts,
                    image: userDetails.DisplayPicture,
                    DisplayName: userDetails.DisplayName,
                    navbar: "navbar-up"
                });
            })
        })   
    },

    // retrieve all posts with uniBadge '&#128047' by finding all documents in collection userPost
    getUST: function (req,res){
        var post = {uniBadge: "&#128047"};
      
        var query = {DisplayName: req.query.DisplayName};

        var projection = {
            fName: 1,
            lName: 1,
            CreditScore: 1,
            DisplayName: 1,
            DisplayPicture: 1,
        };

        db.findMany('userPost',post,function(posts){
            db.find('userProfile', query, projection, function(userDetails){
                res.render('timeline',{
                    fn: userDetails.fName, 
                    ln: userDetails.lName, 
                    cs: userDetails.CreditScore,
                    posts: posts,
                    image: userDetails.DisplayPicture,
                    DisplayName: userDetails.DisplayName,
                    navbar: "navbar-ust"
                });
            })
        })   
    },

    getIndivPost: function (req, res){
        var id = req.query._id;
        console.log()

        var details = {
            _id: ObjectId(id)
        }

         db.findOne('userPost', details, function(result){
            if(result.uniBadge == '&#127993'){
                res.render('indivpost',{
                    posts: result,
                    username: req.query.DisplayName,
                    navbar: "navbar-dlsu"
                });
            }

            else if(result.uniBadge == "&#x1f985"){
                res.render('indivpost',{
                    posts: result,
                    username: req.query.DisplayName,
                    navbar: "navbar-admu"
                });
            }

            else if(result.uniBadge == "&#9994" ){
                res.render('indivpost',{
                    posts: result,
                    username: req.query.DisplayName,
                    navbar: "navbar-up"
                });
            }

            else{
                res.render('indivpost',{
                    posts: result,
                    username: req.query.DisplayName,
                    navbar: "navbar-ust"
                });
            }
        })   
    },
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

    createPost: function(req,res){
        var post = {
            postTitle: req.query.postTitle,
            postBody: req.query.postBody,
            postTags: req.query.postTags,
            Username: req.query.DisplayName,
            uniBadge: req.query.uniBadge,
            navbar: req.query.navbar,
            Upvotes: '0'
        }
        
        // db.insert('userPost',post,function(result){
        //     if(result){
        //         console.log(result);
        //     }
        // })

    

        db.insertOne('userPost', post, function(result) {
            res.render('partials/post', posts, function (err, html) {
                res.send(html);
            });
        });
    },

    // check: function(req, res){
    //     var email = req.query.Email;
    //     console.log(email);

    // },

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