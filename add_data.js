// import module from db.js in models directory
const db = require('./models/db.js')

// name of collection
const collection = 'userProfile';

// call function createDatabase 
db.createDatabase();

// create/populate userProfile objects containing fields such as Username, Email, Password, DisplayPicture, CreditScore, SavedPostID, University, Bio
var user = {
    Username: 'iravillanuevaaaa',
    Email: 'iravillanueva94@dlsu.edu.ph',
    Password: 'lasalle',
    DisplayPicture: 'human.jpg',
    CreditScore: '54',
    SavedPostID: '1',
    University: 'Lasalle',
    Bio: 'I love web development!'
}

db.insertOne(collection, user);