const db = require('../models/db.js');
const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const User = require('../models/ProfileModel.js');
const Post = require('../models/PostModel.js');
const Comment = require('../models/CommentModel.js');
const helper = require('../helpers/helper.js');

const postHelperController = {
    
    upvotePost: function(req, res) {
        var post_id = helper.sanitize(req.query.post_id);
        
        if(req.query.puid == req.session.user){
            db.updateOne(Post,{_id: post_id, downvote: { $gt: 0} }, {$inc: {downvote: -1}}, function(post){
                if(post){
                    //console.log(post);
                    db.updateOne(User,{_id: req.session.user}, {$pull: {postsDownVoted: post_id}}, function(user){
                        if(user){
                            //console.log(user);
                            db.updateOne(Post,{_id: post_id}, {$inc: {upvote: 1}}, function(post){
                                if(post){
                                    //console.log(post);
                                    db.updateOne(User,{_id: req.session.user}, {$push: {postsUpVoted: post_id}}, function(user){
                                        if(user){
                                            //console.log(user);
                                        }
                                    })
                                }
                            })      
                        }
                    })
                }
            }) 
        } else{
            db.updateOne(Post,{_id: post_id, downvote: { $gt: 0} }, {$inc: {downvote: -1}}, function(post){
                if(post){
                    //console.log(post);
                    db.updateOne(User,{_id: req.session.user}, {$pull: {postsDownVoted: post_id}}, function(user){
                        if(user){
                            //console.log(user);
                            db.updateOne(Post,{_id: post_id}, {$inc: {upvote: 1}}, function(post){
                                if(post){
                                    db.updateOne(User, {_id: req.query.puid}, {$inc: {creditScore: 1}}, function(credit){
                                        if(credit){

                                            db.updateOne(User,{_id: req.session.user}, {$push: {postsUpVoted: post_id}}, function(user){
                                                if(user){
                                                    //console.log(user);
                                                }
                                            })
                                        }
                                    })
                                }
                            })      
                        }
                    })
                }
            }) 
        }
    },
    
    unupvotePost: function(req, res) {
        var post_id = helper.sanitize(req.query.post_id);

        if(req.query.puid == req.session.user){
            db.updateOne(Post,{_id: post_id}, {$inc: {upvote: -1}}, function(post){
                if(post){
                    db.updateOne(User,{_id: req.session.user}, {$pull: {postsUpVoted: post_id}}, function(user){
                        if(user){
                            //console.log(user);
                        }
                    })
                }
            })       
        } else{
            db.updateOne(Post,{_id: post_id}, {$inc: {upvote: -1}}, function(post){
                if(post){
                    db.updateOne(User, {_id: req.query.puid}, {$inc: {creditScore: -1}}, function(credit){
                        if(credit){
                            db.updateOne(User,{_id: req.session.user}, {$pull: {postsUpVoted: post_id}}, function(user){
                                if(user){
                                    //console.log(user);
                                }
                            })
                        }
                    })
                }
            })       
        }
    },

    downvotePost: function(req, res) {
        var post_id = helper.sanitize(req.query.post_id);

        if(req.query.puid == req.session.user){
            db.updateOne(Post,{_id: post_id, upvote: {$gt: 0}}, {$inc: {upvote: -1}}, function(post){
                if(post){
                    //console.log(post);
                    db.updateOne(User,{_id: req.session.user}, {$pull: {postsUpVoted: post_id}}, function(user){
                        if(user){
                            //console.log(user);
                            db.updateOne(Post,{_id: post_id}, {$inc: {downvote: 1}}, function(post){
                                if(post){
                                    //console.log(post);
                                    db.updateOne(User,{_id: req.session.user}, {$push: {postsDownVoted: post_id}}, function(user){
                                        if(user){
                                            //console.log(user);
                                        }
                                    })
                                     
                                }
                            })       
                        }
                    })
                }
            })      
        } else{
            db.updateOne(Post,{_id: post_id, upvote: {$gt: 0}}, {$inc: {upvote: -1}}, function(post){
                if(post){
                    //console.log(post);
                    db.updateOne(User,{_id: req.session.user}, {$pull: {postsUpVoted: post_id}}, function(user){
                        if(user){
                            //console.log(user);
                            db.updateOne(Post,{_id: post_id}, {$inc: {downvote: 1}}, function(post){
                                if(post){
                                    db.updateOne(User, {_id: req.query.puid}, {$inc: {creditScore: -1}}, function(credit){
                                        if(credit){
                                            db.updateOne(User,{_id: req.session.user}, {$push: {postsDownVoted: post_id}}, function(user){
                                                if(user){
                                                    //console.log(user);
                                                }
                                            })
                                            
                                        }
                                    })
                                }
                            })       
                        }
                    })
                }
            })      
        }

       
       
    },

    undownvotePost: function(req, res) {
        var post_id = helper.sanitize(req.query.post_id);

        if(req.query.puid == req.session.user){
            db.updateOne(Post,{_id: post_id}, {$inc: {downvote: -1}}, function(post){
                if(post){
                    //console.log(post);
                    db.updateOne(User,{_id: req.session.user}, {$pull: {postsDownVoted: post_id}}, function(user){
                        if(user){
                            //console.log(user);
                        }
                    })
                }
            })
        } else{
            db.updateOne(Post,{_id: post_id}, {$inc: {downvote: -1}}, function(post){
                if(post){
                    //console.log(post);
                    db.updateOne(User, {_id: req.query.puid}, {$inc: {creditScore: 1}}, function(credit){
                        if(credit){
                            db.updateOne(User,{_id: req.session.user}, {$pull: {postsDownVoted: post_id}}, function(user){
                                if(user){
                                    //console.log(user);
                                }
                            })
                        }
                    })
                }
            })
        }
    },


    savePost: function(req, res){
        var post_id = helper.sanitize(req.query.post_id);
        
        // console.log('postid', post_id)
        // console.log('id', id)
        db.updateOne(User, {_id: req.session.user }, {$push: {postsSaved: post_id} }, function (user) {
            if(user){

            }
            // res.redirect('/profile/'+id)
        })
    },

    unsavePost: function(req, res){
        var post_id = helper.sanitize(req.query.post_id);
       
        // console.log('postid', post_id)
        // console.log('id', id)
        db.updateOne(User, {_id: req.session.user }, {$pull: {postsSaved: post_id} }, function (user) {
            if(user){

            }
            // res.redirect('/profile/'+id)
        })
    },

    createComment: function(req, res){
        var comment = helper.sanitize(req.query.commentBar);
    
        const content = {
            _id: new mongoose.Types.ObjectId(),
            post: req.query.PostID,
            user: req.session.user,
            comment: comment,
        }
        
        if(req.query.PostUserID == req.session.user){
            db.insertOne(Comment, content, function(result){
                if(result){
                    db.updateOne(Post, {_id: req.query.PostID}, { $push: { comments: content._id } }, function(com){
                        if(com){
                            db.findOne(User, {_id: req.session.user}, '', function(user){
                                var c = {
                                    user: user,
                                    comment: comment
                                }
                                res.render('partials/commentCard', c, function(err,html){
                                    res.send(html);
                                })
                            })
                        }
                    })
                }
            })
        } else{
            db.insertOne(Comment, content, function(result){
                if(result){
                    db.updateOne(User, {_id: req.query.PostUserID}, {$inc: {creditScore: 3}}, function(user){
                        if(user){
                            db.updateOne(Post, {_id: req.query.PostID}, { $push: { comments: content._id } }, function(com){
                                if(com){
                                    db.findOne(User, {_id: req.session.user}, '', function(user){
                                        var c = {
                                            user: user,
                                            comment: comment
                                        }
                                        res.render('partials/commentCard', c, function(err,html){
                                            res.send(html);
                                        })
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    },

    editPost: function(req, res){
        var postId = helper.sanitize(req.query.id);
        var title = helper.sanitize(req.body.title);
        var body = helper.sanitize(req.body.body);
        var tags = helper.sanitize(req.body.tags);
        var photo = helper.sanitize(req.body.upload);

        console.log(postId)
        console.log(title)
        console.log(body)
        console.log(tags)

        // no uploaded photo
        if (!req.file) {
            db.updateMany(User,{}, {$pull: {postsUpVoted: postId, postsDownVoted:postId}}, function(vote){
                if(vote){
                    db.updateOne(Post, {_id: postId}, {title: title, body: body, tags: tags, upvote: 0, downvote: 0, edited: true}, function(result){
                        if(result){
                            if(!req.session.user) res.redirect('/');
                            else{
                                db.findOne(Post, {_id: postId}, '', function(result){
                                    if(result){
                                        result
                                            .populate('user')
                                            .execPopulate(function(err, post){
                                                // console.log("hello");
                                                // console.log(post);
                                                db.findOne(User, {_id: req.session.user}, '', function(active_user){
                                                    var getComments = helper.getComments(postId);
                                                    getComments.exec(function(err, comments){
                                                        res.render('indivpost', {
                                                            active_session: req.session.user && req.cookies.user_sid,
                                                            active_user: req.session.user,
                                                            post: post.toObject(),
                                                            user: active_user,
                                                            saved: active_user.postsSaved,
                                                            upvoted: active_user.postsUpVoted,
                                                            downvoted: active_user.postsDownVoted,
                                                            comments: comments,
                                                            edit: true
                                                        })
                                                    })
                                                })
                                            })
                                    }
                                })

                            }
                        }
                    })
                }
            })
        }

        // photo uploaded
        else {
            //rename user's uploaded avatar
            var newPostName = postId;
            var postFileName = helper.renamePost(req, newPostName);

            helper.updatePost(newPostName, postFileName, res);

            db.updateMany(User,{}, {$pull: {postsDownVoted: postId, postsUpVoted: postId}}, function(vote){
                if(vote){
                    db.updateOne(Post, {_id: postId}, {title: title, body: body, tags: tags, upvote: 0, downvote: 0, edited: true}, function(result){
                        if(result){
                            if(!req.session.user) res.redirect('/');
                            else{
                                db.findOne(Post, {_id: postId}, '', function(result){
                                    if(result){
                                        result
                                            .populate('user')
                                            .execPopulate(function(err, post){
                                                // console.log("hello");
                                                // console.log(post);
                                                db.findOne(User, {_id: req.session.user}, '', function(active_user){
                                                    var getComments = helper.getComments(postId);
                                                    getComments.exec(function(err, comments){
                                                        res.render('indivpost', {
                                                            active_session: req.session.user && req.cookies.user_sid,
                                                            active_user: req.session.user,
                                                            post: post.toObject(),
                                                            user: active_user,
                                                            saved: active_user.postsSaved,
                                                            upvoted: active_user.postsUpVoted,
                                                            downvoted: active_user.postsDownVoted,
                                                            comments: comments,
                                                            edit: true
                                                        })
                                                    })
                                                })
                                            })
                                    }
                                })

                            }
                        }
                    })
                }
            })
        }     
                
    },

    editComment: function(req, res){
        var commentId = helper.sanitize(req.query.id);
        var postId = helper.sanitize(req.query.postid)
        var comment = helper.sanitize(req.body.commentBar);

        console.log(postId)
        console.log(commentId)
        console.log(comment)
                            
            db.updateOne(Comment, {_id: commentId}, {comment: comment}, function(result){ 
                if(result){
                    res.redirect('/post/'+postId); 
                }
            })
    },

    deleteComment: function(req, res){
        var comment_id = helper.sanitize(req.params.commentId);
        var post_id = helper.sanitize(req.params.id)
        console.log('commentId', comment_id)
        console.log('postid', post_id)
        var comment_details = {
            _id: ObjectID(comment_id)
        }

        db.updateOne(Post,{_id: post_id}, {$pull: {comments: comment_id}}, function(post){
            if(post){
                db.deleteOne(Comment, comment_details, function(f){
                    if(f){
                        console.log('deleted: ', comment_id)
                        res.redirect('/post/'+post_id);
                    }
                    
                });
            }
        })
    }
}

module.exports = postHelperController;