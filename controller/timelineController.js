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

        var projectstatus = {postID: 1,_id: 0}  
        var queryupvote = {
            user: req.query.DisplayName,
            upvote: '1',
            downvote: '0'
        };
        var querydownvote = {
            user: req.query.DisplayName,
            upvote: '0',
            downvote: '1'
        }
        var meron = 0;

        db.findManyP('statusPost', queryupvote, projectstatus, function(status){
            if(status.length != 0){
                console.log("meron");
                meron = 1;
                status.forEach(function(i){
                    db.updateOne('userPost', {_id: ObjectId(i.postID)}, {$set: {"Upvote": 'upvoted.png', "Downvote": 'downvote.png'}})
                 });
            }
            db.findManyP('statusPost', querydownvote, projectstatus, function(dstatus){
                if(dstatus.length != 0){
                    console.log("meron");
                    dstatus.forEach(function(i){
                        db.updateOne('userPost', {_id: ObjectId(i.postID)}, {$set: {"Upvote": 'upvote.png', "Downvote": 'downvoted.png'}})
                     });
                }
                else if(meron != 1){
                    console.log("wala");
                    db.updateMany('userPost', {}, {$set: {"Upvote": 'upvote.png', "Downvote": 'downvote.png'}})
                }
                
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
            });     
        });
        
        db.findMany('statusPost', {}, function(){});        
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
        var user = {DisplayName: req.query.DisplayName};
        var details = {_id: ObjectId(id)};
        var comment = {PostID: id};

        // var update = {$set: {"User": req.query.DisplayName}}
        // db.updateMany('userComments', comments, update);
        db.findMany('userComments',comment,function(usercomment){
            db.findOne('userPost', details, function(result){
                db.findOne('userProfile', user, function(userPicture){
                    if(result.uniBadge == '&#127993'){
                            res.render('indivpost',{
                                posts: result,
                                username: req.query.DisplayName,
                                navbar: "navbar-dlsu",
                                image: userPicture.DisplayPicture,
                                comments: usercomment,
                                cs: userPicture.CreditScore,
                                id: id
                            });
                        }
            
                        else if(result.uniBadge == "&#x1f985"){
                            res.render('indivpost',{
                                posts: result,
                                username: req.query.DisplayName,
                                navbar: "navbar-admu",
                                image: userPicture.DisplayPicture,
                                comments: usercomment,
                                cs: userPicture.CreditScore,
                                id: id
                            });
                        }
            
                        else if(result.uniBadge == "&#9994" ){
                            res.render('indivpost',{
                                posts: result,
                                username: req.query.DisplayName,
                                navbar: "navbar-up",
                                image: userPicture.DisplayPicture,
                                comments: usercomment,
                                cs: userPicture.CreditScore,
                                id: id
                            });
                        }
            
                        else{
                            res.render('indivpost',{
                                posts: result,
                                username: req.query.DisplayName,
                                navbar: "navbar-ust",
                                image: userPicture.DisplayPicture,
                                comments: usercomment,
                                cs: userPicture.CreditScore,
                                id: id
                            });
                        }
                })
            })   
        })
    },

    createPost: function(req,res){
        var query = {DisplayName: req.query.DisplayName}
        var projection = {
            CreditScore: 1
        }
        
        db.find('userProfile',query, projection, function(user){
            var post = {
                postTitle: req.query.postTitle,
                postBody: req.query.postBody,
                postTags: req.query.postTags,
                Username: req.query.DisplayName,
                User: req.query.DisplayName,
                uniBadge: req.query.uniBadge,
                navbar: req.query.navbar,
                Upvotes: '0',
                CreditScore: user.CreditScore,
                timelineBadge: req.query.timelineBadge
            }
    
            db.insertOne('userPost', post, function(result) {
                res.render('partials/post', post, function (err, html) {
                    res.send(html);
                });
            });
        })
        
    },

    createComment: function(req,res){
        var query = {
            DisplayName: req.query.DisplayName      
        }
        
        var projection = {
            CreditScore: 1,
            DisplayPicture: 1,
        }

        db.find('userProfile', query, projection, function(user){
            var comments = {
                name: req.query.DisplayName,
                commentBody: req.query.commentBar,
                DisplayPicture: user.DisplayPicture,
                PostID: req.query.PostID,
                CreditScore: user.CreditScore,
            }
            
            db.insertOne('userComments', comments, function(result){
                res.render('partials/commentCard', comments, function(err,html){
                    res.send(html);
                })
            })
        })
    },

    insertStatus: function(req, res){
        var postID = req.query.postID;
        var user = req.query.user;
        var upvote = req.query.upvote;
        var downvote = req.query.downvote;

        var status = {
            postID: postID,
            user: user,
            upvote: upvote,
            downvote: downvote
        }

        db.insertOne('statusPost', status, function(result){})

        var post = {};
        var query = {DisplayName: req.query.user};
        var projection = {
            fName: 1,
            lName: 1,
            CreditScore: 1,
            DisplayName: 1,
            DisplayPicture: 1,
        };

        var projectstatus = {postID: 1,_id: 0}  
        var queryupvote = {
            user: req.query.user,
            upvote: '1',
            downvote: '0'
        };

        var querydownvote = {
            user: req.query.user,
            upvote: '0',
            downvote: '1'
        }

        db.findManyP('statusPost', queryupvote, projectstatus, function(status){
            if(status.length != 0){
                console.log("meron");
                meron = 1;
                status.forEach(function(i){
                    db.updateOne('userPost', {_id: ObjectId(i.postID)}, {$set: {"Upvote": 'upvoted.png', "Downvote": 'downvote.png'}})
                 });
            }
            db.findManyP('statusPost', querydownvote, projectstatus, function(dstatus){
                if(dstatus.length != 0){
                    console.log("meron");
                    dstatus.forEach(function(i){
                        db.updateOne('userPost', {_id: ObjectId(i.postID)}, {$set: {"Upvote": 'upvote.png', "Downvote": 'downvoted.png'}})
                     });
                }
                else if(meron != 1){
                    console.log("wala");
                    db.updateMany('userPost', {}, {$set: {"Upvote": 'upvote.png', "Downvote": 'downvote.png'}})
                }
                
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
            });     
        });
    },

    getStatus: function(req,res){
        var postID = req.query.postID;
        var user = req.query.user;
        var query = {
            postID: postID,
            user: user
        }

        console.log("get");
        console.log(postID)
        db.findOne('statusPost', query, function(result){
            res.send(result);
        })

    },

    updateStatus: function(req,res){
        var postID = req.query.postID;
        var user = req.query.user;
        var upvote = req.query.upvote;
        var downvote = req.query.downvote;
        var query = {
            postID: postID,
            user: user
        };

        console.log("update");
        console.log(req.query.yes);
        console.log(upvote);
        console.log(downvote);

        var update = {$set: {
            "upvote": upvote,
            "downvote": downvote
            }
        }

        db.updateOne('statusPost', query, update);

        var post = {};
        var query = {DisplayName: req.query.user};
        var projection = {
            fName: 1,
            lName: 1,
            CreditScore: 1,
            DisplayName: 1,
            DisplayPicture: 1,
        };

        var projectstatus = {postID: 1,_id: 0}  
        var queryupvote = {
            user: req.query.user,
            upvote: '1',
            downvote: '0'
        };

        var querydownvote = {
            user: req.query.user,
            upvote: '0',
            downvote: '1'
        }

        db.findManyP('statusPost', queryupvote, projectstatus, function(status){
            if(status.length != 0){
                console.log("meron");
                meron = 1;
                status.forEach(function(i){
                    db.updateOne('userPost', {_id: ObjectId(i.postID)}, {$set: {"Upvote": 'upvoted.png', "Downvote": 'downvote.png'}})
                 });
            }
            db.findManyP('statusPost', querydownvote, projectstatus, function(dstatus){
                if(dstatus.length != 0){
                    console.log("meron");
                    dstatus.forEach(function(i){
                        db.updateOne('userPost', {_id: ObjectId(i.postID)}, {$set: {"Upvote": 'upvote.png', "Downvote": 'downvoted.png'}})
                     });
                }
                else if(meron != 1){
                    console.log("wala");
                    db.updateMany('userPost', {}, {$set: {"Upvote": 'upvote.png', "Downvote": 'downvote.png'}})
                }
                
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

module.exports = timelineController;