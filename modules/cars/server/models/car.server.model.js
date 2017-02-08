'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Car Schema
 */
var CarSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  mark: {
    type: Schema.ObjectId,
    ref: 'Mark'
  },
  model: {
    type: String,
    default: '',
    trim: true,
    required: 'Model cannot be blank'
  },
  power: {
    type: Number,
    default: '',
    trim: true,
    required: 'Power cannot be blank'
  },
  fuel: {
    type: String,
    default: '',
    trim: true,
    required: 'Fuel cannot be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  imageURL: {
    type: String,
    default: '/modules/cars/client/img/default.png'
  }
});

mongoose.model('Car', CarSchema);
