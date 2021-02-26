const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String, 
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    photo: {
        type: String
    },
    university: {
        type: String,
        required: true
    },
    upvote: {
        type: Number,
        default: 0
    },
    downvote: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    delete: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Post', postSchema);