const mongoose = require('mongoose');
const db = require('../models/db.js');
const { validationResult } = require('express-validator');
const helper = require('../helpers/helper.js');
const { ObjectID } = require('mongodb');
const Profile = require('../models/ProfileModel');
const Post = require('../models/PostModel');

const timelineController = {

    // retrieve all posts by finding all documents in Post collection
    getTimeline: function (req, res){
        if(!req.session.user) res.redirect('/');
        else{
            db.findOne(Profile, {_id: req.session.user}, '', function(user){

                var getPost = helper.getAllPosts();
                getPost.exec(function(err, post){
                    if (err) throw err;
                    // console.log(post);
                    res.render('timeline', {
                        active_session: req.session.user && req.cookies.user_sid,
                        active_user: req.session.user,
                        user: user,
                        posts: post
                    });
                })
            })
        }
    },

    // create a post to be inserted in the Post collection 
    createPost: function (req, res){
        var errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            errors = errors.errors;

            var details = {};
            for (let i = 0; i < errors.length; i++){
                  // remove array indices for wildcard checks
                  details[`${errors[i].param.replace(/\[\d\]/g, '')}Error`] =
                  errors[i].msg;
            }

            db.findOne(Profile, {_id: req.session.user}, '', function(user){
                res.render('timeline', {
                    user: user,
                    input: req.body,
                    details: details,
                });
            })
            
        } 
        else {
            var title = helper.sanitize(req.body.title);
            var body = helper.sanitize(req.body.body);
            var tags = helper.sanitize(req.body.tags);
            var univ = helper.sanitize(req.body.university);

            const post = {
                _id: new mongoose.Types.ObjectId(),
                user: req.session.user,
                title: title,
                body: body,
                tags: tags,
                university: univ
            }

            db.insertOne(Post, post, function(flag){
                if(flag){
                    res.redirect('/timeline');
                }
            })
        }
    },

    deletePost: function (req, res) {
        var post_id = helper.sanitize(req.params.postId);
        console.log('postid', post_id)
        var post_details = {
            _id: ObjectID(post_id)
        }

        db.deleteOne(Post, post_details, function(f){
            if(f){
                console.log('deleted: ', post_id)
                res.redirect('/timeline');
            }
            
        });
        
    },

    // retrieve all DLSU posts in Post collection
    getDLSU: function (req, res){
        if(!req.session.user) res.redirect('/');
        else{
            db.findOne(Profile, {_id: req.session.user}, '', function(user){

                var getPost = helper.getDLSUPost();
                getPost.exec(function(err, post){
                    if (err) throw err;
                    res.render('timeline', {
                        active_session: req.session.user && req.cookies.user_sid,
                        active_user: req.session.user,
                        user: user,
                        posts: post,
                        navbar: "navbar-dlsu"
                    });
                })
            })
        }
    },

    // retrieve all ADMU posts in Post collection
    getADMU: function (req, res){
        if(!req.session.user) res.redirect('/');
        else{
            db.findOne(Profile, {_id: req.session.user}, '', function(user){

                var getPost = helper.getADMUPost();
                getPost.exec(function(err, post){
                    if (err) throw err;
                    res.render('timeline', {
                        active_session: req.session.user && req.cookies.user_sid,
                        active_user: req.session.user,
                        user: user,
                        posts: post,
                        navbar: "navbar-admu"
                    });
                })
            })
        }
    },

    // retrieve all UP posts in Post collection
    getUP: function (req, res){
        if(!req.session.user) res.redirect('/');
        else{
            db.findOne(Profile, {_id: req.session.user}, '', function(user){

                var getPost = helper.getUPPost();
                getPost.exec(function(err, post){
                    if (err) throw err;
                    res.render('timeline', {
                        active_session: req.session.user && req.cookies.user_sid,
                        active_user: req.session.user,
                        user: user,
                        posts: post,
                        navbar: "navbar-up"
                    });
                })
            })
        }
    },

    // retrieve all UST posts in Post collection
    getUST: function (req, res){
        if(!req.session.user) res.redirect('/');
        else{
            db.findOne(Profile, {_id: req.session.user}, '', function(user){

                var getPost = helper.getUSTPost();
                getPost.exec(function(err, post){
                    if (err) throw err;
                    res.render('timeline', {
                        active_session: req.session.user && req.cookies.user_sid,
                        active_user: req.session.user,
                        user: user,
                        posts: post,
                        navbar: "navbar-ust"
                    });
                })
            })
        }
    },

    getIndivPost: function (req, res){
        var postId = helper.sanitize(req.params.postId);

        if(!req.session.user) res.redirect('/');
        else{
            db.findOne(Post, {_id: postId}, '', function(result){
                if(result){
                    result
                        .populate('user')
                        .execPopulate(function(err, post){
                            console.log("hello");
                            console.log(post);
                            res.render('indivpost', {
                                active_session: req.session.user && req.cookies.user_sid,
                                active_user: req.session.user,
                                post: post.toObject(),
                            })
                        })
                }
            })

        }
    },

    // getTimeline: function (req,res) {
    //     var post = {};
    //     var query = {DisplayName: req.query.DisplayName};
    //     var projection = {
    //         fName: 1,
    //         lName: 1,
    //         CreditScore: 1,
    //         DisplayName: 1,
    //         DisplayPicture: 1,
    //     };

    //     var update = {$set: {"User": req.query.DisplayName}}
    //     db.updateMany('userPost', post, update);

    //     var projectstatus = {postID: 1,_id: 0}  
    //     var queryupvote = {
    //         user: req.query.DisplayName,
    //         upvote: '1',
    //         downvote: '0'
    //     };
    //     var querydownvote = {
    //         user: req.query.DisplayName,
    //         upvote: '0',
    //         downvote: '1'
    //     }
    //     var meron = 0;

    //     db.findManyP('statusPost', queryupvote, projectstatus, function(status){
    //         if(status.length != 0){
    //             console.log("meron");
    //             meron = 1;
    //             db.updateMany('userPost', {}, {$set: {"Upvote": 'upvote.png', "Downvote": 'downvote.png'}})
    //             status.forEach(function(i){
    //                 db.updateOne('userPost', {_id: ObjectId(i.postID)}, {$set: {"Upvote": 'upvoted.png', "Downvote": 'downvote.png'}})
    //              });
    //         }
    //         db.findManyP('statusPost', querydownvote, projectstatus, function(dstatus){
    //             if(dstatus.length != 0){
    //                 console.log("meron");
    //                 dstatus.forEach(function(i){
    //                     db.updateOne('userPost', {_id: ObjectId(i.postID)}, {$set: {"Upvote": 'upvote.png', "Downvote": 'downvoted.png'}})
    //                  });
    //             }
    //             else if(meron != 1){
    //                 console.log("wala");
    //                 db.updateMany('userPost', {}, {$set: {"Upvote": 'upvote.png', "Downvote": 'downvote.png'}})
    //             }
                
    //             db.findMany('userPost',post,function(posts){
    //                 db.find('userProfile', query, projection, function(userDetails){
    //                     res.render('timeline',{
    //                         fn: userDetails.fName, 
    //                         ln: userDetails.lName, 
    //                         cs: userDetails.CreditScore,
    //                         image: userDetails.DisplayPicture,
    //                         posts: posts,
    //                         DisplayName: req.query.DisplayName,
    //                     });
    //                 })
    //             })
    //         });     
    //     });
        
    //     db.findMany('statusPost', {}, function(){});        
    // },

    // getPosts: function (req, res){
    //     var post = {};

    //     db.findMany('userPost',post,function(posts){
    //         res.render('timeline',posts);
    //     })
    // },

    // // retrieve all posts with uniBadge '&#127993' by finding all documents in collection userPost
    // getDLSU: function (req,res) {
    //     var post = {uniBadge: "&#127993"};
    //     var query = {DisplayName: req.query.DisplayName};

    //     var projection = {
    //         fName: 1,
    //         lName: 1,
    //         CreditScore: 1,
    //         DisplayName: 1,
    //         DisplayPicture: 1,
    //     };

    //     db.findMany('userPost',post,function(posts){
    //         db.find('userProfile', query, projection, function(userDetails){
    //             res.render('timeline',{
    //                 fn: userDetails.fName, 
    //                 ln: userDetails.lName, 
    //                 cs: userDetails.CreditScore,
    //                 posts: posts,
    //                 image: userDetails.DisplayPicture,
    //                 DisplayName: userDetails.DisplayName,
    //                 navbar: "navbar-dlsu"
    //             });
    //         })
    //     })    
    // },

    // // retrieve all posts with uniBadge '&#x1f985' by finding all documents in collection userPost
    // getADMU: function (req,res){
    //     var post = {uniBadge: "&#x1f985"};
      
    //     var query = {DisplayName: req.query.DisplayName};

    //     var projection = {
    //         fName: 1,
    //         lName: 1,
    //         CreditScore: 1,
    //         DisplayName: 1,
    //         DisplayPicture: 1,
    //     };

    //     db.findMany('userPost',post,function(posts){
    //         db.find('userProfile', query, projection, function(userDetails){
    //             res.render('timeline',{
    //                 fn: userDetails.fName, 
    //                 ln: userDetails.lName, 
    //                 cs: userDetails.CreditScore,
    //                 posts: posts,
    //                 image: userDetails.DisplayPicture,
    //                 DisplayName: userDetails.DisplayName,
    //                 navbar: "navbar-admu"
    //             });
    //         })
    //     })   
    // },

    // // retrieve all posts with uniBadge '&#99945' by finding all documents in collection userPost
    // getUP: function (req,res){
    //     var post = {uniBadge: "&#9994"};
        
    //     var query = {DisplayName: req.query.DisplayName};

    //     var projection = {
    //         fName: 1,
    //         lName: 1,
    //         CreditScore: 1,
    //         DisplayName: 1,
    //         DisplayPicture: 1,
    //     };

    //     db.findMany('userPost',post,function(posts){
    //         db.find('userProfile', query, projection, function(userDetails){
    //             res.render('timeline',{
    //                 fn: userDetails.fName, 
    //                 ln: userDetails.lName, 
    //                 cs: userDetails.CreditScore,
    //                 posts: posts,
    //                 image: userDetails.DisplayPicture,
    //                 DisplayName: userDetails.DisplayName,
    //                 navbar: "navbar-up"
    //             });
    //         })
    //     })   
    // },

    // // retrieve all posts with uniBadge '&#128047' by finding all documents in collection userPost
    // getUST: function (req,res){
    //     var post = {uniBadge: "&#128047"};
      
    //     var query = {DisplayName: req.query.DisplayName};

    //     var projection = {
    //         fName: 1,
    //         lName: 1,
    //         CreditScore: 1,
    //         DisplayName: 1,
    //         DisplayPicture: 1,
    //     };

    //     db.findMany('userPost',post,function(posts){
    //         db.find('userProfile', query, projection, function(userDetails){
    //             res.render('timeline',{
    //                 fn: userDetails.fName, 
    //                 ln: userDetails.lName, 
    //                 cs: userDetails.CreditScore,
    //                 posts: posts,
    //                 image: userDetails.DisplayPicture,
    //                 DisplayName: userDetails.DisplayName,
    //                 navbar: "navbar-ust"
    //             });
    //         })
    //     })   
    // },

    uploadImage: function(req,res){
        
        var uploadPhoto = upload.single('picture');
        var img = fs.readFileSync(req.file.path);
        var encode_image = img.toString('base64');
         // Define a JSONobject for the image attributes for saving to database
          
         var finalImg = {
              contentType: req.file.mimetype,
              image:  new Buffer(encode_image, 'base64')
           };
        
        db.insertOne(finalImg, function(result){
            console.log(result)
            console.log('saved to database')
            res.redirect('/')
        })

    },

    // createPost: function(req,res){
    //     var query = {DisplayName: req.query.DisplayName}
    //     var projection = {
    //         CreditScore: 1
    //     }
        
    //     db.find('userProfile',query, projection, function(user){
    //         var post = {
    //             postTitle: req.query.postTitle,
    //             postBody: req.query.postBody,
    //             postTags: req.query.postTags,
    //             Username: req.query.DisplayName,
    //             User: req.query.DisplayName,
    //             uniBadge: req.query.uniBadge,
    //             navbar: req.query.navbar,
    //             Upvotes: '0',
    //             CreditScore: user.CreditScore,
    //             timelineBadge: req.query.timelineBadge,
    //             Upvote: 'upvote.png',
    //             Downvote: 'downvote.png',
    //         }
    
    //         db.insertOne('userPost', post, function(result) {
    //             res.render('partials/post', post, function (err, html) {
    //                 res.send(html);
    //             });
    //         });
    //     })
        
    // },

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