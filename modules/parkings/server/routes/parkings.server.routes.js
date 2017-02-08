'use strict';

/**
 * Module dependencies
 */
var parkingsPolicy = require('../policies/parkings.server.policy'),
  parkings = require('../controllers/parkings.server.controller');

module.exports = function (app) {
  // Parkings collection routes
  app.route('/api/parkings').all(parkingsPolicy.isAllowed)
    .get(parkings.list)
    .post(parkings.create);

  // Single parking routes
  app.route('/api/parkings/:parkingId').all(parkingsPolicy.isAllowed)
    .get(parkings.read)
    .put(parkings.update)
    .delete(parkings.delete);

  // Finish by binding the parking middleware
  app.param('parkingId', parkings.parkingByID);
};
