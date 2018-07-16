'use strict';
const express = require('express');
const router = express.Router();

const Trip = require('../models/trip');

router.get('/', (req, res, next) => {
  Trip.find({ participants: req.session.currentUser._id })
    .then((trip) => {
      res.render('profile', trip);
    });
});

// Logout POST

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('login');
});

module.exports = router;
