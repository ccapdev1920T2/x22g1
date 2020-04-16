
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
        var pic = 'default.png';
        var userbio = 'This is your default bio';

        var user = {
            Email: email,
            Password: password,
            fName: fName,
            lName: lName,
            Username: username,
            DisplayPicture: pic,
            Bio: userbio
        }

        // db.insert('userProfile', user, function(flag) {
        //     if(flag) {
        //         res.redirect('/HOME?username=' + username);
        //     }
        // });

    },

    checkEmail: function(req, res){
        var email = req.query.Email;
        //console.log(email);

        db.findOne('userProfile', {Email: email}, function(result){
            res.send(result);
        })

        // mongoose
        // db.findOne(User, {email: email}, 'email', function (result) {
        //     res.send(result);
        // });

    },

    checkSignUpUsername: function(req,res){

        // retrieve value of Username stored in req.query object
        var username = req.query.Username;
        //console.log(username);

        // call the function findOne() from the module in db.js and use the object query to filter the collection 'userProfile' in the database
        // sends an empty string if no result was found. otherwise, send an object containing 'Username'
        db.findOne('userProfile', {Username : username}, function(result){
            res.send(result);
        })


        // mongoose
        // db.findOne(User, {username: username}, 'username', function (result) {
        //     res.send(result);
        // });
    },

}

module.exports = signUpController;