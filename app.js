'use strict';
// require npm packages
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// require your own modules (router, models)
const index = require('./routes/index');
const auth = require('./routes/auth');
const trips = require('./routes/trips');
const profile = require('./routes/profile');

// create app connect to db
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/dbmovies', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

const app = express();

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
app.use('/', index);
app.use('/auth', auth);
app.use('/trips', trips);
app.use('/profile', profile);

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
