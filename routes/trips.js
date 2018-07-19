'use strict';

const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
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

  Trip.findById(tripId)
    .then((result) => {
      let newStartDate = moment(result.startDate).format('l');
      let newEndDate = moment(result.endDate).format('l');
      const data = {
        result,
        newStartDate,
        newEndDate
      };
      res.render('trip-detail', data);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id/invite', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.render('auth/signup');
  }
  const tripId = req.params.id;
  res.render('trip-invite', {tripId});
});

router.post('/:id/invite', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.render('auth/signup');
  }
  const tripId = req.params.id;
  const email = req.body.email;
  // mandar mail a esa direccion de email y dentro del texto del mail poner el tripId que es el codigo que necesitan para agregarse al trip.
  // poner los pasos a seguir 1. crear usuario, 2. poner codigo en llalal.
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'viajejg@gmail.com',
      pass: 'gabrieljulio'
    }
  });
  transporter.sendMail({
    from: '"My Awesome Project Viaje 👻" <viajejg@gmail.com>',
    to: email,
    subject: 'Invitation to join trip and our awesome web Viaje',
    text: `Code to join trip: ${tripId}`,
    html: `<b>Code to join trip: ${tripId}</b>`
  });

  // ***************** */
  res.redirect('/profile');
});

router.get('/:id/flight', (req, res, next) => {
  const tripId = req.params.id;

  Trip.findById(tripId)
    .then((trip) => {
      res.render('newflight', trip);
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/flight', (req, res, next) => {
  const airline = req.body.airline;
  const flightNumber = req.body.flightNumber;
  const departingAirport = req.body.departingAirport;
  const arrivingAirport = req.body.arrivingAirport;
  const departureTime = req.body.departureTime;
  const arrivalTime = req.body.arrivalTime;

  const id = req.params.id;
  Trip.findByIdAndUpdate(id, {
    $push: {
      flights: {
        passengers: [ req.session.currentUser._id ],
        airline: airline,
        flightNumber: flightNumber,
        departingAirport: departingAirport,
        arrivingAirport: arrivingAirport,
        departureTime: departureTime,
        arrivalTime: arrivalTime
      }
    }
  })
    .then(() => {
      return res.redirect('/profile');
      // recuerda hacer save()
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id/flightDetail', (req, res, next) => {
  const tripId = req.params.id;

  Trip.findById(tripId).lean().populate('flights.passengers')
    .then((result) => {
      const data = {
        flights: result.flights,
        tripId: result._id
      };
      data.flights.forEach((flight) => {
        flight.departureTime = moment(flight.departureTime).format('LT');
        flight.arrivalTime = moment(flight.arrivalTime).format('LT');
      });
      res.render('flight-detail', data);
    })
    .catch(error => {
      next(error);
    });
});

router.post('/join', (req, res, next) => {
  const tripId = req.body.codetrip;
  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    req.flash('invalid-trip', 'Code does not exist');
    return res.redirect('/profile');
  }

  Trip.findByIdAndUpdate(tripId, {
    $push: { participants: req.session.currentUser._id }
  })
    .then((result) => {
      if (!result) {
        req.flash('invalid-trip', 'Unable to find your trip');
      }
      return res.redirect('/profile');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
