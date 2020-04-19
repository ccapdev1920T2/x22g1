const mongoose = require('mongoose');

const databaseURL = 'mongodb://localhost:27017';

// additional options to prevent warnings when we run the code
const options = {
    useUnifiedTopology: true,  
    useNewUrlParser: true
};

// import module from db.js in models directory
const db = require('./models/db.js');

//import user module
const User = require('./models/userModels.js');

// import userposts module
const Posts = require('./models/UserPostModels.js');

// call function createDatabase 
db.connect();

// const UserModel = mongoose.model('User', UserSchema);

const userIra = new User({
    Username: 'iravillanueva',
    Email: 'iravillanueva94@dlsu.edu.ph',
    Password: 'lasalle',
    passwordRecheck: 'lasalle',
    DisplayPicture: 'human.jpg',
    CreditScore: '54',
    Bio: 'I love web development!',
    fName: 'Ira',
    lName: 'Villanueva',
});

userIra.save(function(err, newUser){
    if (err) throw err;
    console.log(newUser);
    console.log("Successfully created user!");
});

// create/populate userProfile objects containing fields such as Username, Email, Password, DisplayPicture, CreditScore, SavedPostID, University, Bio
// var user = {
//     Username: 'iravillanueva',
//     Email: 'iravillanueva94@dlsu.edu.ph',
//     Password: 'lasalle',
//     passwordRecheck: 'lasalle',
//     DisplayPicture: 'human.jpg',
//     CreditScore: '54',
//     Bio: 'I love web development!',
//     fName: 'Ira',
//     lName: 'Villanueva',
    //SavedPostID: '1',
    //University: 'DLSU',
// }

// insert object user to collection 'userProfile'
// db.insertOne(User, user, function(flag){});

// var post = {
//     postNumber: '123',
//     postTitle: 'Cute guy sa henry grounds',
//     Username: 'luhzul101',
//     CreditScore: '60',
//     postBody: 'Shoutout nga pala dun sa cute guy na nakatambay sa henry grounds kanina mga 4 pm cute mo po',
//     postTags: '#lasalle',
//     Upvotes: '55'
// }

// // insert object user to collection 'userPost'
// db.insertOne(userPost, post);

const manyPosts = new Posts(
    {
        timelineBadge: 'timeline-badge lasalle',
        uniBadge: '&#127993',
        navbar: 'navbar-dlsu',
        postNumber: '123',
        postTitle: 'Cute guy sa henry grounds',
        Username: 'luhzul101',
        CreditScore: '60',
        postBody: 'Shoutout nga pala dun sa cute guy na nakatambay sa henry grounds kanina mga 4 pm cute mo po',
        postTags: '#lasalle',
        Upvotes: '55'
    },

    {
        timelineBadge: 'timeline-badge ust',
        uniBadge: '&#128047',
        navbar: 'navbar-ust',
        postNumber: '150',
        postTitle: 'Dapitan Milktea',
        Username: 'ghoste101',
        CreditScore: '84',
        postBody: 'SOLID NUNG BAGONG MILKTEA MALAPIT SA DAPITAN??? TRY NIYO GUYS ???',
        postTags: '#ust #milktea',
        Upvotes: '398'
    },

    {
        timelineBadge: 'timeline-badge up',
        uniBadge: '&#9994',
        navbar: 'navbar-up',
        postNumber: '233',
        postTitle: 'Best Lib: Engg Lib',
        Username: 'iskolar101',
        CreditScore: '350',
        postBody: 'So ano ba talaga ang the best library sa diliman? engg lib parin mga sis :p',
        postTags: '#up #diliman #bestlib',
        Upvotes: '345'
    },

    {
        timelineBadge: 'timeline-badge ateneo',
        uniBadge: '&#x1f985',
        navbar: 'navbar-admu',
        postNumber: '543',
        postTitle: 'Weird Fetishes',
        Username: 'areneyow101',
        CreditScore: '601',
        postBody: 'What fetish will you keep a secret from the people you know IRL?',
        postTags: '#fetish',
        Upvotes: '99'
    }
);

manyPosts.save(function(err, NewPosts){
    if (err) throw err;
    console.log(NewPosts);
    console.log("Successfully created posts!");
});


// var posts = [
//     {
//         timelineBadge: 'timeline-badge lasalle',
//         uniBadge: '&#127993',
//         navbar: 'navbar-dlsu',
//         postNumber: '123',
//         postTitle: 'Cute guy sa henry grounds',
//         Username: 'luhzul101',
//         CreditScore: '60',
//         postBody: 'Shoutout nga pala dun sa cute guy na nakatambay sa henry grounds kanina mga 4 pm cute mo po',
//         postTags: '#lasalle',
//         Upvotes: '55'
//     },

//     {
//         timelineBadge: 'timeline-badge ust',
//         uniBadge: '&#128047',
//         navbar: 'navbar-ust',
//         postNumber: '150',
//         postTitle: 'Dapitan Milktea',
//         Username: 'ghoste101',
//         CreditScore: '84',
//         postBody: 'SOLID NUNG BAGONG MILKTEA MALAPIT SA DAPITAN??? TRY NIYO GUYS ???',
//         postTags: '#ust #milktea',
//         Upvotes: '398'
//     },

//     {
//         timelineBadge: 'timeline-badge up',
//         uniBadge: '&#9994',
//         navbar: 'navbar-up',
//         postNumber: '233',
//         postTitle: 'Best Lib: Engg Lib',
//         Username: 'iskolar101',
//         CreditScore: '350',
//         postBody: 'So ano ba talaga ang the best library sa diliman? engg lib parin mga sis :p',
//         postTags: '#up #diliman #bestlib',
//         Upvotes: '345'
//     },

//     {
//         timelineBadge: 'timeline-badge ateneo',
//         uniBadge: '&#x1f985',
//         navbar: 'navbar-admu',
//         postNumber: '543',
//         postTitle: 'Weird Fetishes',
//         Username: 'areneyow101',
//         CreditScore: '601',
//         postBody: 'What fetish will you keep a secret from the people you know IRL?',
//         postTags: '#fetish',
//         Upvotes: '99'
//     }
// ]

// db.insertMany(Posts,posts, function(flag) {});