//import mongoose module
const mongoose = require('mongoose');

//import user module
const User = require('../models/userModels.js');

// import userposts module
const Posts = require('../models/UserPostModels.js');

// import usercomments module
const Comments = require('../models/UserCommentModels.js');

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
        model.create(doc, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    insertMany: function(model, docs) {
        model.insertMany(docs, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    findOne: function(model, query, callback) {
        model.findOne(query, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    },

    find: function(model, query, projection, callback) {
        model.findOne(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    },

    findMany: function(model, query, projection, callback) {
        model.find(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    },

    updateOne: function(model, filter, update) {
        model.updateOne(filter, update, function(error, result) {
            if(error) return callback(false);
            console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
    },

    updateMany: function(model, filter, update) {
        model.updateMany(filter, update, function(error, result) {
            if(error) return callback(false);
            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        });
    },

    deleteOne: function(model, conditions) {
        model.deleteOne(conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    deleteMany: function(model, conditions) {
        model.deleteMany(conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    }

}

    // enables to export datebase object when called in another .js file
    module.exports = database;