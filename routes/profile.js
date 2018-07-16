'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('profile');
});

// Logout POST

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('login');
});

module.exports = router;
