'use strict';

const express = require('express');
const router = express.Router();

// User models require
const User = require('../models/user');
const bcryptSalt = 10;

// BCrypt to encrypt passwords
const bcrypt = require('bcrypt');

/* Get signup */
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  // console.log(req.body);
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
  // console.log(hashPass);

  const newUser = User({
    username,
    email,
    password: hashPass
  });
  newUser.save()
    .then(user => {
      res.redirect('/');
    });
});

// GET login //
router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', (req, res, next) => {

});

router.get('/logout', (req, res, next) => {

});

module.exports = router;
