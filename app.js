'use strict'

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();
var logger = require('morgan');
var townRouter = require('./routes/town');
var routeRouter = require('./routes/route');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/town', townRouter);
app.use('/route', routeRouter);
module.exports = app;
app.listen(8080);

