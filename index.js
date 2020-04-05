// import modules express and handlebars
const express = require('express');
const handlebars = require('handlebars');

// import routes module
const routes = require('./routes/routes.js');

const path = require('path');
const app = express();
const port = 9090;

// define css,img, and views as static 
app.use(express.static('css'));
app.use(express.static('img'));
app.use(express.static('views'));

// define the paths contained in routes module
app.use('/', routes);

// set hbs as view engine
app.set('view engine', 'hbs');

app.listen(port, function(){
    console.log('App listening at port ' + port)
})


