'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tripSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  participants: [{
    type: ObjectId,
    ref: 'User'
  }],
  flights: [{
    airline: {
      type: String
    },
    flightNumber: {
      type: String
    //   required: true
    },
    departingAirport: {
      type: String
    //   required: true
    },
    arrivingAirport: {
      type: String
    //   required: true
    },
    departureTime: {
      type: Date
    //   required: true
    },
    arrivalTime: {
      type: Date
    //   required: true
    },
    passangers: [{
      type: ObjectId,
      ref: 'User'
    }]
  }]
},
{ timestamps: true }
);

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
