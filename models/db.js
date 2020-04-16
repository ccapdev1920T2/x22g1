
//import mongodb module
const mongodb = require('mongodb');

//import mongoose module
const mongoose = require('mongoose');

//import user module
const User = require('./userModels.js');

// mongodb client (connection of mongodb server)
const client = mongodb.MongoClient;
const url = "mongodb://localhost:27017"; 

// additional options to prevent warnings when we run the code
const options = {
    useUnifiedTopology: true,  
    useNewUrlParser: true
};

// name of database
const dbName = 'Big4FW_database';

// database functions (CRUD functions)
const database = {

    connect: function(){
        mongoose.connect(url, options, function(error){
            if(error) throw error;
            console.log('Connected to: ' + url + dbName);
        });
    },

    insertOne: function(model, doc, callback) {
        db.create(doc, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    insertMany: function(model, docs) {
        db.insertMany(docs, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    findOne: function(model, query, callback) {
        db.findOne(query, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    },

    find: function(model, query, projection, callback) {
        db.findOne(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    },

    findMany: function(model, query, projection, callback) {
        db.find(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    },

    updateOne: function(model, filter, update) {
        db.updateOne(filter, update, function(error, result) {
            if(error) return callback(false);
            console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
    },

    updateMany: function(model, filter, update) {
        db.updateMany(filter, update, function(error, result) {
            if(error) return callback(false);
            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        });
    },

    deleteOne: function(model, conditions) {
        db.deleteOne(conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    deleteMany: function(model, conditions) {
        db.deleteMany(conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    }

}

    // enables to export datebase object when called in another .js file
    module.exports = database;