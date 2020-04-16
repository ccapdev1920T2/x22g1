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
        required: true
    },
    Downvotes: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('UserPosts', UserPostSchema);