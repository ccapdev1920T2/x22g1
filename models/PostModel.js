const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Types.ObjectId,
        Ref: 'Profile'
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
        required: true
    },
    downvote: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Post', postSchema);