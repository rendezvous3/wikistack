var express = require('express');
var swig = require('swig');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
    res.send('Rendering!');
});

app.listen(3000, function(){
    console.log("Server is listening on port 3000!");
})