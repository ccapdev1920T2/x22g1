const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const db = require('../models/db.js');
const helper = require('../helpers/helper.js');

const Profile = require('../models/ProfileModel');
const saltRounds = 10;

const signUpController = {

    getSignUp: function (req, res){
        res.render('signup');
    },

    postSignUp: function(req,res){
        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;

            var details = {};
            for (let i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;

            res.render('signup', {
                inputs: req.body,
                details: details,
            });
            
        } 
        else {
            var { email, password, fName, lName, username } = req.body;

            // apply hashing
            bcrypt.hash(password, saltRounds, (err, hash) => {

                //user used default avatar
                if (!req.files['avatar']) {
                    const profile = {
                        _id: new mongoose.Types.ObjectId(),
                        email: email,
                        password: hash,
                        fName: fName,
                        lName: lName,
                        username: username,
                    };

                    db.insertOne(Profile, profile, function (flag) {
                        if (flag) {
                            req.session.user = profile._id;
                        }
                    });
                }

                // user uploaded his/her own avatar
                else {
                    const profile = {
                        _id: new mongoose.Types.ObjectId(),
                        email: email,
                        password: hash,
                        fName: fName,
                        lName: lName,
                        username: username,
                    };

                    //rename user's uploaded avatar
                    var newAvatarName = profile._id;
                    var avatarFileName = helper.renameAvatar(req, newAvatarName);
                    profile.avatar = avatarFileName;

                    db.insertOne(Profile, profile, function (flag) {
                        if (flag) {
                            req.session.user = profile._id;
                        }
                    });
                }           
            });
        }
       
        
    },

}

module.exports = signUpController;