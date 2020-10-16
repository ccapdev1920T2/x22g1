const sanitize = require('mongo-sanitize');
const fs = require('fs');
const Post = require('../models/PostModel');
const Profile = require('../models/ProfileModel');
const db = require('../models/db.js');

const helper = {
    sanitize: function (query) {
        return sanitize(query);
    },

    renameAvatar: function (req, newName) {
        var origName = req.file.originalname;
        var extension = origName.substring(origName.lastIndexOf('.'));
        const newURL = req.file.destination + '/' + newName + extension;

        fs.renameSync(req.file.path, newURL);
        return newName + extension;
    },

    updateAvatar: function(id, avatar, res) {
        console.log("pls");
        console.log(id);
        let extension = avatar.substring(avatar.lastIndexOf("."));
        let filename = avatar.split('.').slice(0, -1).join('.');

        db.updateOne(Profile, {_id: id}, {avatar, avatar}, function(result){
            switch (extension) {
                case '.jpg':
                    fs.unlink('./public/avatars/' + filename + '.png', (fds) => {});
                    fs.unlink('./public/avatars/' + filename + '.jpeg', (fds) => {});
                    break;
                case '.png': 
                    fs.unlink('./public/avatars/' + filename + '.jpg', (fds) => {});
                    fs.unlink('./public/avatars/' + filename + '.jpeg', (fds) => {});
                    break;
                case '.jpeg':
                    fs.unlink('./public/avatars/' + filename + '.png', (fds) => {});
                    fs.unlink('./public/avatars/' + filename + '.jpg', (fds) => {});
                    break;
            }
        })
        
        // Profile.updateOne({_id: id}, {avatar: avatar})
        //     .then((a) => {
        //         switch (extension) {
        //             case '.jpg':
        //                 fs.unlink('./public/avatars/' + filename + '.png', (fds) => {});
        //                 fs.unlink('./public/avatars/' + filename + '.jpeg', (fds) => {});
        //                 break;
        //             case '.png': 
        //                 fs.unlink('./public/avatars/' + filename + '.jpg', (fds) => {});
        //                 fs.unlink('./public/avatars/' + filename + '.jpeg', (fds) => {});
        //                 break;
        //             case '.jpeg':
        //                 fs.unlink('./public/avatars/' + filename + '.png', (fds) => {});
        //                 fs.unlink('./public/avatars/' + filename + '.jpg', (fds) => {});
        //                 break;
        //         }
        //     })
    },

    getAllPosts: function () {
        return Post.find()
            .populate('user')
            .sort('-created')
            .lean()
    },

    getDLSUPost: function () {
        return Post.find({university: 'DLSU'})
            .populate('user')
            .sort('-created')
            .lean()
    },

    getADMUPost: function () {
        return Post.find({university: 'ADMU'})
            .populate('user')
            .sort('-created')
            .lean()
    },

    getUPPost: function () {
        return Post.find({university: 'UP'})
            .populate('user')
            .sort('-created')
            .lean()
    },

    getUSTPost: function () {
        return Post.find({university: 'UST'})
            .populate('user')
            .sort('-created')
            .lean()
    },

    getUserPost: function (userId) {
        return Post.find({user: userId})
            .populate('user')
            .sort('-created')
            .lean()
    },

};

module.exports = helper;