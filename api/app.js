require('dotenv').config({ path: `${__dirname}/config/.env` });

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');

const townRouter = require('./routes/towns');
const routeRouter = require('./routes/routes');
const indexRouter = require('./routes/index');
const appRouter = require('./routes/app');
const authenticateRouter = require('./routes/autheniticate');
require('./config/passportSetup');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cookieSession({ maxAge: 1000 * 60 * 60, keys: ['fqweofjqwof'] }));
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const cors = require('cors');
  app.use(cors());
}

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/home', passport.authenticate('google'), (req, res) => {
  res.send(req.user);
});
app.use('/towns', townRouter);
app.use('/routes', routeRouter);
app.use('/app', appRouter);
app.use('/authenticate', authenticateRouter);
app.use(express.static('public'));
app.use(express.static('react-app'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
