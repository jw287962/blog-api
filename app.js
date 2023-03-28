var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');

require('dotenv').config()
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var v1Router = require('./routes/v1');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/v1',v1Router)
// app.use('/api', apiRouter);


// app.use(passport.initialize());
// app.use(passport.session());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// MONGGOOSE
const dev_db_url = "mongodb+srv://your_user_name:your_password@cluster0.lz91hw2.mongodb.net/blog-api?retryWrites=true&w=majority";
const dbString = process.env.MONGODB_URI  || dev_db_url;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbString);
}



module.exports = app;
