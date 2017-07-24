var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var express = require('express');

var app = express()
var index = require ('./routes/index');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

//routes
app.get('/', index.home);
app.get('/cats/bycolor/:color', index.colors);
app.get('/cats', index.listCats);
app.get('/cats/new', index.newCat);
app.get('/cats/delete/old', index.farm);




app.listen(3000)