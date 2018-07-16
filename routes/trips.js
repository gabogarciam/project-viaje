'use strict';

const express = require('express');
const router = express.Router();

const Trip = require('../models/trip');

router.get('/new', (req, res, next) => {
  res.render('newtrip');
});

router.post('/', (req, res, next) => {
  const title = req.body.tripTitle;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const description = req.body.description;
  const participants = req.session.currentUser._id;


  const newTrip = Trip({
    title,
    startDate,
    endDate,
    description,
    participants
  });

  newTrip.save()
    .then(() => {
      return res.redirect('/profile');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
