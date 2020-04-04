const express = require('express');
const handlebars = require('handlebars');
const path = require('path');
const app = express();
const port = 9090;

app.use(express.static('css'));
app.use(express.static('img'));
app.use(express.static('views'));
app.set('view engine', 'hbs');

app.listen(port, function(){
    console.log('App listening at port ' + port)
})

app.get('/', function (req, res){
    res.sendFile(__dirname + '/login.html')
});

app.get('/login', function (req, res){
    res.sendFile(__dirname + '/login.html')
});

app.get('/timeline', function (req, res){
    res.sendFile(__dirname + '/timeline.html')
});