const express = require('express');
const swig = require('swig');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

const app = express();

// app.engine('html', swig.renderFile);
// swig.setDefaults({ cache: false });

app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
//app.set('views', __dirname + '/views');


app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
    res.render('index');
});

app.listen(3000, function(){
    console.log("Server is listening on port 3000!");
})