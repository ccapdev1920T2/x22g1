
const db = require('../models/db.js');

const signUpController = {

    getSignUp: function (req, res){
        res.render('signup');
    }


}

module.exports = signUpController;