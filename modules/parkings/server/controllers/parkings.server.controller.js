'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  fs = require('fs'),
  mongoose = require('mongoose'),
  Parking = mongoose.model('Parking'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a parking
 */
exports.create = function (req, res) {
  var parking = new Parking(req.body);
  parking.user = req.user;

  parking.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(parking);
    }
  });
};

/**
 * Show the current parking
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var parking = req.parking ? req.parking.toJSON() : {};

  // Add a custom field to the Parking, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Parking model.
  parking.isCurrentUserOwner = !!(req.user && parking.user && parking.user._id.toString() === req.user._id.toString());

  res.json(parking);
};

/**
 * Update an parking
 */
exports.update = function (req, res) {
  var parking = req.parking;

  parking.name = req.body.name;
  parking.cars = req.body.cars;

  parking.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(parking);
    }
  });
};

/**
 * Delete an parking
 */
exports.delete = function (req, res) {
  var parking = req.parking;

  parking.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
     } else {
      res.json(parking);
    }
    
  });
};

/**
 * List of Parkings
 */
exports.list = function (req, res) {
  Parking.find().sort('-created').populate('user', 'displayName').exec(function (err, parkings) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(parkings);
    }
  });
};

/**
 * Parking middleware
 */
exports.parkingByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Parking is invalid'
    });
  }

  Parking.findById(id).populate('user', 'displayName').populate({
    path:     'cars',     
    populate: { path:  'mark'
      //model: 'Mark' 
    }
  })
  .exec(function(err, parking){
    if (err) {
      return next(err);
    } else if (!parking) {
      return res.status(404).send({
        message: 'No parking with that identifier has been found'
      });
    }
    req.parking = parking;
    next();
  });
};
