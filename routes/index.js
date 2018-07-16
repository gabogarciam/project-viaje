'use strict';

const express = require('express');
const router = express.Router();

// ---------- Signup Routes ---------- //

/* GET users Signup. */
router.get('/', (req, res, next) => {
  const data = {
    messages: req.flash('signup-error')
  };
  // res.render('auth/signup', data);
  res.render('index', data);
});

module.exports = router;
