const db = require('../models/db.js');

const timelineController = {

    // retrieve all posts by finding all documents in collection userPost
    getTimeline: function (req,res) {
        var post = {};

        var query = {Username: 'iravillanueva'};

        var projection = {
            fName: 1,
            lName: 1,
            CreditScore: 1
        };
      
        db.findMany('userPost',post,function(posts){
            res.render('timeline',posts);
            // db.find('userProfile', query, projection, function(userDetails){
            //     res.render('timeline',posts);
            //     res.render('timeline',{fn: userDetails.fName, ln: userDetails.lName, cs: userDetails.CreditScore});
            // })
        })

    },

    getSideProfile: function (req,res) {

        var query = {Username: 'iravillanueva'};

        var projection = {
            fName: 1,
            lName: 1,
            CreditScore: 1
        };

        db.find('userProfile', query, projection, function(userDetails){
            //res.render('timeline',{fn: userDetails.fName, ln: userDetails.lName, cs: userDetails.CreditScore});
            //res.send(userDetails);
            res.render('sideProfile',{
                fName: userDetails.fName, 
                lName: userDetails.lName, 
                CreditScore: userDetails.CreditScore});
        })
    },

    // retrieve all posts with uniBadge '&#127993' by finding all documents in collection userPost
    getDLSU: function (req,res){
        var post = {uniBadge: "&#127993"};
      
        db.findMany('userPost', post, function(result){
            res.render('timeline',result);
        })
        
    },

    // retrieve all posts with uniBadge '&#x1f985' by finding all documents in collection userPost
    getADMU: function (req,res){
        var post = {uniBadge: "&#x1f985"};
      
        db.findMany('userPost', post, function(result){
            res.render('timeline',result);
        })
    },

    // retrieve all posts with uniBadge '&#99945' by finding all documents in collection userPost
    getUP: function (req,res){
        var post = {uniBadge: "&#9994"};
      
        db.findMany('userPost', post, function(result){
            res.render('timeline',result);
        })
    },

    // retrieve all posts with uniBadge '&#128047' by finding all documents in collection userPost
    getUST: function (req,res){
        var post = {uniBadge: "&#128047"};
      
        db.findMany('userPost', post, function(result){
            res.render('timeline',result);
        })
    },

    getIndiv: function (req, res){
        
        var post = {Username: "ghoste101"};
        var postNum = req.query.postNumber;
        var query = {
            postNumber: postNum,
            
        }

        db.findOne('userPost',query,function(result){
            if(result){
                res.redirect('/indivpost?postNum=' + postNum);
            }
        })

        db.findOne('userPost', post, function(result){
            res.render('indivpost', result);
        })

    }
}

module.exports = timelineController;