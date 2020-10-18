const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String, 
        required: true
    },
    password: {
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
    username: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'default.png',
    },
    creditScore: {
        type: Number,
        default: 0
    },
})

module.exports = mongoose.model('Profile', profileSchema);
