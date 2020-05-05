// import module from db.js in models directory
const db = require('./models/db.js')

// name of collections
const userProfile = 'userProfile';
const userPost = 'userPost';
const userComments = 'userComments';

// drop collection
db.dropCollection(userPost);
db.dropCollection(userProfile);
db.dropCollection(userComments);
