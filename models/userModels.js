var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    passwordRecheck: {
        type: String,
        required: true
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('User', UserSchema);