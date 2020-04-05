// import module from db.js in models directory
const db = require('./models/db.js')

// name of collections
const userProfile = 'userProfile';
const userPost = 'userPost';


// call function createDatabase 
db.createDatabase();

// create/populate userProfile objects containing fields such as Username, Email, Password, DisplayPicture, CreditScore, SavedPostID, University, Bio
var user = {
    Username: 'iravillanueva',
    Email: 'iravillanueva94@dlsu.edu.ph',
    Password: 'lasalle',
    DisplayPicture: 'human.jpg',
    CreditScore: '54',
    SavedPostID: '1',
    University: 'DLSU',
    Bio: 'I love web development!',
    fName: 'Ira',
    lName: 'Villanueva',
    postNumber: '#8888',
    postTitle: 'ZZZZ',
    postBody: 'Hello There',
    postTags: '#gumanaKa'

}

// insert object user to collection 'userProfile'
db.insertOne(userProfile, user);

var post = {
    postNumber: '123',
    postTitle: 'Cute guy sa henry grounds',
    Username: 'luhzul101',
    CreditScore: '60',
    postBody: 'Shoutout nga pala dun sa cute guy na nakatambay sa henry grounds kanina mga 4 pm cute mo po',
    postTags: '#lasalle',
    Upvotes: '55'
}

// insert object user to collection 'userPost'
db.insertOne(userPost, post);

