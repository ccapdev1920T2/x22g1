const sanitize = require('mongo-sanitize');
const fs = require('fs');
const Post = require('../models/PostModel');

const helper = {
    sanitize: function (query) {
        return sanitize(query);
    },

    renameAvatar: function (req, newName) {
        var origName = req.files['avatar'][0].originalname;
        var extension = origName.substring(origName.lastIndexOf('.'));
        const newURL =
            req.files['avatar'][0].destination + '/' + newName + extension;

        fs.renameSync(req.files['avatar'][0].path, newURL);
        return newName + extension;
    },

    getTimelinePosts: function (){
        return Post.find()
            .populate('user')
            .sort('-created')
            .lean()
    }
};

module.exports = helper;