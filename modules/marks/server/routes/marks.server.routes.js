'use strict';

/**
 * Module dependencies
 */
var marksPolicy = require('../policies/marks.server.policy'),
  marks = require('../controllers/marks.server.controller');

module.exports = function (app) {
  // Marks collection routes
  app.route('/api/marks').all(marksPolicy.isAllowed)
    .get(marks.list)
    .post(marks.create);

  // Mark Upload Image single route
  app.route('/api/markUploadImage').all(marksPolicy.isAllowed)
    .post(marks.markUploadImage);

  // Single mark routes
  app.route('/api/marks/:markId').all(marksPolicy.isAllowed)
    .get(marks.read)
    .put(marks.update)
    .delete(marks.delete);

  // Finish by binding the mark middleware
  app.param('markId', marks.markByID);
};
