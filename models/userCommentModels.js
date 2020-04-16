var mongoose = require('mongoose');

var UserCommentsSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    commentTags: {
        type: String,
        required: true
    },
    commentUpvotes: {
        type: Number,
        required: true
    },
    commentDownvotes: {
        type: Number,
        required: true
    },
    
});

module.exports = mongoose.model('UserComments', UserCommentsSchema);