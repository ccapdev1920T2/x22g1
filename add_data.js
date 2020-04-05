// import module from db.js in models directory
const db = require('./models/db.js')

// name of collection
const collection = 'userProfile';

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



db.insertOne(collection, user);