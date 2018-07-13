'use strict';
// require npm packages
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// require your own modules (router, models)
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// create app connect to db

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// configure middlewares (static, session, cookies, body, ...)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// -- routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// -- 404 and error handler

// NOTE: requires a views/not-found.ejs template
app.use((req, res, next) => {
  res.status(404);
  res.render('errors/not-found');
});

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('errors/error');
  }
});

module.exports = app;
