const User = require('../models/ProfileModel.js');
const Post = require('../models/PostModel');
const helper = require('../helpers/helper.js');
const db = require('../models/db.js');

const postHelperController = {
    
    upvotePost: function(req, res) {
        var post_id = helper.sanitize(req.params.postId);
        var id = helper.sanitize(req.session.user);

        db.updateOne(Post,{_id: post_id, downvote: { $gt: 0} }, {$inc: {downvote: -1}}, function(post){
            if(post){
                //console.log(post);
                db.updateOne(User,{_id: id}, {$pull: {postsDownVoted: post_id}}, function(user){
                    if(user){
                        //console.log(user);
                        db.updateOne(Post,{_id: post_id}, {$inc: {upvote: 1}}, function(post){
                            if(post){
                                //console.log(post);
                                db.updateOne(User,{_id: id}, {$push: {postsUpVoted: post_id}}, function(user){
                                    if(user){
                                        //console.log(user);
                                        res.redirect('/timeline');
                                    }
                                })
                            }
                        })      
                    }
                })
            }
        }) 
    },
    
    unupvotePost: function(req, res) {
        var post_id = helper.sanitize(req.params.postId);
        var id = helper.sanitize(req.session.user);

        db.updateOne(Post,{_id: post_id}, {$inc: {upvote: -1}}, function(post){
            if(post){
                //console.log(post);
                db.updateOne(User,{_id: id}, {$pull: {postsUpVoted: post_id}}, function(user){
                    if(user){
                        //console.log(user);
                        res.redirect('/timeline');
                    }
                })
            }
        })       
    },

    downvotePost: function(req, res) {
        var post_id = helper.sanitize(req.params.postId);
        var id = helper.sanitize(req.session.user);

        db.updateOne(Post,{_id: post_id, upvote: {$gt: 0}}, {$inc: {upvote: -1}}, function(post){
            if(post){
                //console.log(post);
                db.updateOne(User,{_id: id}, {$pull: {postsUpVoted: post_id}}, function(user){
                    if(user){
                        //console.log(user);
                        db.updateOne(Post,{_id: post_id}, {$inc: {downvote: 1}}, function(post){
                            if(post){
                                //console.log(post);
                                db.updateOne(User,{_id: id}, {$push: {postsDownVoted: post_id}}, function(user){
                                    if(user){
                                        //console.log(user);
                                        res.redirect('/timeline');
                                    }
                                })
                                 
                            }
                        })       
                    }
                })
            }
        })      
    },

    undownvotePost: function(req, res) {
        var post_id = helper.sanitize(req.params.postId);
        var id = helper.sanitize(req.session.user);

        db.updateOne(Post,{_id: post_id}, {$inc: {downvote: -1}}, function(post){
            if(post){
                //console.log(post);
                db.updateOne(User,{_id: id}, {$pull: {postsDownVoted: post_id}}, function(user){
                    if(user){
                        //console.log(user);
                        res.redirect('/timeline');
                    }
                })
            }
        })
    },

    savePost: function(req, res){
        var post_id = helper.sanitize(req.params.postId);
        var id = helper.sanitize(req.session.user)
        console.log('postid', post_id)
        console.log('id', id)
        User.updateOne({_id: id }, {$push: {postsSaved: post_id} }, function (user) {
            res.redirect('/profile/'+id)
        })
    },

    unsavePost: function(req, res){
        var post_id = helper.sanitize(req.params.postId);
        var id = helper.sanitize(req.session.user)
        console.log('postid', post_id)
        console.log('id', id)
        User.updateOne({_id: id }, {$pull: {postsSaved: post_id} }, function (user) {
            res.redirect('/profile/'+id)
        })
    }
}

module.exports = postHelperController;