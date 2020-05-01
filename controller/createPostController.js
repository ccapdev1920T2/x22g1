
const db = require('../models/db.js');


const createPostController = {

    postCreate: function(req,res){


        var postTitle = req.body.postTitle;
        var post = req.body.post;
        var postTags = req.body.postTags;
        var uniBadge = req.body.universities;
        
        console.log(req.body.postTitle);

        var posts = {
            postTitle: postTitle,
            post: post,
            postTags: postTags,
            uniBadge: uniBadge

        }

        

        // db.insertOne('userPost',posts,function(result){
        //     if(result){
        //         res.redirect('/HOME?postTitle=' + postTitle);
        //     }
        // })

        db.insertOne('userPost', posts, function(result) {
            res.render('partials/post', posts, function (err, html) {
                res.send(html);
            });
        });

        
        
    },

}

module.exports = createPostController;

