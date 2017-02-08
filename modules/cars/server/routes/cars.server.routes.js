'use strict';

/**
 * Module dependencies
 */
var carsPolicy = require('../policies/cars.server.policy'),
  cars = require('../controllers/cars.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/cars').all(carsPolicy.isAllowed)
    .get(cars.list)
    .post(cars.create);

  app.route('/api/car/:carId/pdf').all(carsPolicy.isAllowed)
    .get(cars.carCreatePdf);

  // Mark Upload Image single route
  app.route('/api/carUploadImage').all(carsPolicy.isAllowed)
    .post(cars.carUploadImage);

  // Single car routes
  app.route('/api/cars/:carId').all(carsPolicy.isAllowed)
    .get(cars.read)
    .put(cars.update)
    .delete(cars.delete);

  // Finish by binding the car middleware
  app.param('carId', cars.carByID);
};
