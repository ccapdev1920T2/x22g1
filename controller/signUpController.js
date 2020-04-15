
const db = require('../models/db.js');

const User = require('../models/userModels.js');

const signUpController = {

    getSignUp: function (req, res){
        res.render('signup');
    },

    postSignUp: function(req,res){

        var email = req.body.email;
        var password = req.body.password;
        var passwordRecheck = req.body.passwordRecheck;
        var fName = req.body.fName;
        var lName = req.body.lName;
        var username = req.body.username;

        var user = {
            email: email,
            password: password,
            passwordRecheck: passwordRecheck,
            fName: fName,
            lName: lName,
            username: username
        }

        // db.insertOne(User, user, function(flag) {
        //     if(flag) {
        //         res.redirect('/HOME?username=' + username);
        //     }
        // });

    }


}

module.exports = signUpController;