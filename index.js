// import modules express and handlebars
const express = require('express');
const hbs = require('hbs');

// import routes module
const routes = require('./routes/routes.js');

// import module `database` from `./model/db.js`
const db = require('./models/db.js');

const path = require('path');
const app = express();
const port = 9090;

// partials
hbs.registerPartials(__dirname + '/views/partials');

// define css, img, js, and views as static 
app.use(express.static('public'));
app.use(express.static('views'));

// define the paths contained in routes module
app.use('/', routes);

// set hbs as view engine
app.set('view engine', 'hbs');

app.get('/weh', function(req,res){
    res.render('timeline');
});

// connects to the database
// db.connect();

app.listen(port, function(){
    console.log('App listening at port ' + port)
})


