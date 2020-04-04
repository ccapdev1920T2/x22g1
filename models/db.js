//import mongodb module
const mongodb = require('mongodb');

//mongodb client (connection of mongodb server)
const client = mongodb.MongoClient;
const url = "mongodb://localhost:27017"; 

//additional options to prevent warnings when we run the code
const options = {useUnifiedTopology: true};

//name of database
const dbName = 'Big4FW_database';

//database functions (CRUD functions)
const database = {

    //CREATE a database



}