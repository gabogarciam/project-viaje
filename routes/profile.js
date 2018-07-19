'use strict';
const express = require('express');
const router = express.Router();

const Trip = require('../models/trip');

router.get('/', (req, res, next) => {
  Trip.find({ participants: req.session.currentUser._id })
    .then((result) => {
      const data = {
        trips: result,
        messages: req.flash('invalid-trip')
      };
      res.render('profile', data);
    });
});

module.exports = router;
