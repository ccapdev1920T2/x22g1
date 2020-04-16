var mongoose = require('mongoose');

var UserPostSchema = new mongoose.Schema({

    timelineBadge: {
        type: String,
        required: true
    },
    uniBadge: {
        type: String,
        required: true
    },
    navbar: {
        type: String,
        required: true
    },
    postNumber: {
        type: Number,
        required: true
    },
    postTitle: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true
    },
    CreditScore: {
        type: Number,
        required: true
    },
    postBody: {
        type: String,
        required: true
    },
    postTags: {
        type: String,
        required: true
    },
    Upvotes: {
        type: Number,
        required: false
    },
    Downvotes: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('UserPosts', UserPostSchema);