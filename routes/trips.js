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

router.get('/:id', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.render('auth/signup');
  }
  const tripId = req.params.id;
  console.log(req.params);

  Trip.findById(tripId)
    .then((result) => {
      res.render('trip-detail', result);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id/flight', (req, res, next) => {
  res.render('newflight');
});

router.post('/trips/:id/flight', (req, res, next) => {
  const airline = req.body.airline;
  const flightNumber = req.body.flightNumber;
  const departingAirport = req.body.departingAirport;
  const arrivingAirport = req.body.arrivingAirport;
  const departureTime = req.body.departureTime;
  const arrivalTime = req.body.arrivalTime;

  const id = req.params.id;
  Trip.findByIdAndUpdate(id, {
    flights: {$push: {airline: airline,
      flightNumber: flightNumber,
      departingAirport: departingAirport,
      arrivingAirport: arrivingAirport,
      departureTime: departureTime,
      arrivalTime: arrivalTime
    } }
  })
    .then(() => {
      res.render('/profile');
      // recuerda hacer save()
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
