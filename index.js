// import modules express and handlebars
const express = require('express');
const hbs = require('hbs');

// import routes module
const routes = require('./routes/routes.js');

// import module `database` from `./model/db.js`
const db = require('./models/db.js');

var async = require('async');

const path = require('path');
const app = express();
const port = process.env.PORT || 9090;

// partials
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.urlencoded({extended: true}));

// define css, img, js, and views as static 
app.use(express.static('public'));
app.use(express.static('views'));

// define the paths contained in routes module
app.use('/', routes);

// set hbs as view engine
app.set('view engine', 'hbs');

// connects to the database
// db.connect();

const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb://victor:lasalle@cluster0-shard-00-00-fxgom.mongodb.net:27017,cluster0-shard-00-01-fxgom.mongodb.net:27017,cluster0-shard-00-02-fxgom.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});

app.listen(port, function(){
    console.log('App listening at port ' + port)
})


