'use strict'

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();
var logger = require('morgan');
var townRouter = require('./routes/town');
var routeRouter = require('./routes/route');
var indexRouter = require('./routes/index');

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', indexRouter);
app.use('/town', townRouter);
app.use(express.static('public'));
app.use('/route', routeRouter);
module.exports = app;
app.listen(8080);

