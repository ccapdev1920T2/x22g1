
const db = require('../models/db.js');

//const User = require('../models/userModels.js');

const signUpController = {

    getSignUp: function (req, res){
        res.render('signup');
    },

    postSignUp: function(req,res){

        var email = req.body.email;
        var password = req.body.password;
        var fName = req.body.fName;
        var lName = req.body.lName;
        var username = req.body.username;
        var pic = 'default.png'

        var user = {
            Email: email,
            Password: password,
            fName: fName,
            lName: lName,
            Username: username,
            DisplayPicture: pic
        }

        // db.insertOne('userProfile', user, function(flag) {
        //     if(flag) {
        //         res.redirect('/HOME?username=' + username);
        //     }
        // });

    }


}

module.exports = signUpController;