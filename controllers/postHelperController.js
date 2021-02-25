const db = require('../models/db.js');
const User = require('../models/ProfileModel.js');
const ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const helper = require('../helpers/helper.js');

const postHelperController = {
    
    likePost: function(req, res){
        var post = {}
        
        
        db.updateOne('userPost', post, function(post){
            postId = req.query._id
        })
    },

    likePost: function(postId, username, res) {
        Post.updateOne({_id: postId}, {$inc: {numberOfLikes: 1}})
        .then((a) => {
            User.updateOne({username: username }, {$addToSet: {postsLiked: postId} })
            .then((b) => {
                res.send(true);
            });
        });
    },
    
    unlikePost: function(postId, username, res) {
        Post.updateOne({_id: postId}, {$inc: {numberOfLikes: -1}})
        .then((a) => {
            User.updateOne({username: username }, {$pull: {postsLiked: postId} })
            .then((b) => {
                res.send(true);
            });
        });
    },

    savePost: function(req, res){
        var post_id = helper.sanitize(req.query.post_id);
        var id = helper.sanitize(req.session.user)
        // console.log('postid', post_id)
        // console.log('id', id)
        db.updateOne(User, {_id: id }, {$push: {postsSaved: post_id} }, function (user) {
            if(user){

            }
            // res.redirect('/profile/'+id)
        })
    },

    unsavePost: function(req, res){
        var post_id = helper.sanitize(req.query.post_id);
        var id = helper.sanitize(req.session.user)
        // console.log('postid', post_id)
        // console.log('id', id)
        db.updateOne(User, {_id: id }, {$pull: {postsSaved: post_id} }, function (user) {
            if(user){

            }
            // res.redirect('/profile/'+id)
        })
    }
}

module.exports = postHelperController;