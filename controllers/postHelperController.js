const db = require('../models/db.js');
const ObjectId = require('mongodb').ObjectID;

const helper = {
    
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
}