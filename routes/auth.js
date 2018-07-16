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
            return res.redirect('/profile');
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

/* GET users login. */
router.get('/login', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }
  const data = {
    messages: req.flash('login-error')
  };
  res.render('auth/login', data);
});

/* POST users login. */
router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) {
    req.flash('login-error', 'Indicate a email to sign up');
    return res.redirect('login');
  }

  if (!password) {
    req.flash('login-error', 'Indicate a password to sign up');
    return res.redirect('login');
  }

  User.findOne({ 'email': email })
    .then(user => {
      if (!user) {
        req.flash('login-error', 'the username doesn\'t exist');
        return res.redirect('login');
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        req.flash('login-error', 'Username or password are incorrect');
        return res.redirect('login');
      }
      req.session.currentUser = user;
      res.redirect('/profile');
    })
    .catch(error => {
      next(error);
    });
});

// Logout POST

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/auth/login');
});

module.exports = router;
