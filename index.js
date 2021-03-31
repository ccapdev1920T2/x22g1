// import modules express and handlebars
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// data base and express
const app = express();

// define static folders
app.use(express.static('public'));
app.use(express.static('views'));

// set hbs as view engine
app.set('view engine', 'hbs');
app.engine(
    'hbs',
    exphbs({
        extname: 'hbs',
        defaultView: 'main',
        layoutsDir: path.join(__dirname, '/views/layouts'),
        partialsDir: path.join(__dirname, '/views/partials')
    }),
)

// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

hbs.registerHelper('match', function(v1, v2, options){
    return v1 == v2 ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('checkSaved', function(s, a, options) {
        var string = a.toString();
        var arr = string.split(",");
        for (let i=0; i<arr.length; i++){
            if (arr[i] == (s)) {
            var valid = true
            break;
            } else {
            var valid = false
            }
        }
        if(valid){
            return options.fn(this);
        }
        else{
            return options.inverse(this)
        }
        
});

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
