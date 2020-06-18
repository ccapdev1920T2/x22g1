const db = require('../models/db.js');
const ObjectId = require('mongodb').ObjectID;

const indivpostController = {

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
                db.updateMany('userPost', {}, {$set: {"Upvote": 'upvote.png', "Downvote": 'downvote.png'}})
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
                            DisplayName: req.query.user,
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
                db.updateMany('userPost', {}, {$set: {"Upvote": 'upvote.png', "Downvote": 'downvote.png'}})
                status.forEach(function(i){
                    console.log("weh");
                    db.updateOne('userPost', {_id: ObjectId(i.postID)}, {$set: {"Upvote": 'upvoted.png', "Downvote": 'downvote.png'}})
                 });
            }
            db.findManyP('statusPost', querydownvote, projectstatus, function(dstatus){
                if(dstatus.length != 0){
                    console.log("meron");
                    dstatus.forEach(function(i){
                        console.log("ay");
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
                            DisplayName: req.query.user,
                        });
                    })
                })
            });     
        });
    },
}

module.exports = indivpostController;