// import modules express and handlebars
const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');

// data base and express
const app = express();

// define static folders
app.use(express.static('public'));
app.use(express.static('views'));

// set hbs as view engine
app.set('view engine', 'hbs');

hbs.registerHelper('match', function(v1, v2, options){
    return v1 == v2 ? options.fn(this) : options.inverse(this);
});

// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// import routes module
const routes = require('./routes/routes.js');

// partials
hbs.registerPartials(__dirname + '/views/partials');

// define the paths contained in routes module
app.use('/', routes);

// connects to the database
const url = 'mongodb+srv://admin:big4user@big4fw.d5d5o.mongodb.net/big4fw?retryWrites=true&w=majority';
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};
mongoose.connect(url, options, err => {
  if (err) throw err;
  console.log('connected at ' + url);
});

// 404 error page

// binds the server to a specific port
let port = process.env.PORT;

if(port == null || port == "") {
    port = 9090;
}

app.listen(port, function () {
    console.log('app listening at port ' + port);
});
