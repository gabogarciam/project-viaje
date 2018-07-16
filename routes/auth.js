'use strict';

const express = require('express');
const router = express.Router();

// User models require
const User = require('../models/user');
const bcryptSalt = 10;

// BCrypt to encrypt passwords
const bcrypt = require('bcrypt');

// ---------- Signup Routes ---------- //

/* GET users Signup. */
router.get('/signup', (req, res, next) => {
  const data = {
    messages: req.flash('signup-error')
  };
  res.render('auth/signup', data);
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

  // Form validations
  if (!username && !email && !password) {
    req.flash('signup-error', 'Indicate a username, email and a password to sign up');
    return res.redirect('/');
  } else if (username === '') {
    req.flash('signup-error', 'Indicate a username to sign up');
    return res.redirect('/');
  } else if (email === '') {
    req.flash('signup-error', 'Indicate a email to sign up');
    return res.redirect('/');
  } else if (password === '') {
    req.flash('signup-error', 'Indicate a password to sign up');
    return res.redirect('/');
  }

  User.findOne({ 'email': email })
    .then(user => {
      if (user) {
        req.flash('signup-error', 'This email already has an account');
        return res.redirect('/');
      } else {
        newUser.save()
          .then(user => {
            req.session.currentUser = newUser;
            return res.redirect('/');
          })
          .catch(error => {
            next(error);
          });
      }
    })
    .catch(error => {
      next(error);
    });
});

// ---------- Login Routes ---------- //

// GET login //
router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', (req, res, next) => {

});

// ---------- Logout Routes ---------- //

router.get('/logout', (req, res, next) => {

});

module.exports = router;
