'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  fs = require('fs'),
  mongoose = require('mongoose'),
  Mark = mongoose.model('Mark'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.markUploadImage = function (req, res) {
  // Filtering to upload only images
  var multerConfig = config.uploads.mark.image;
  multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;
  var upload = multer(multerConfig).single('newMarkPicture');

  upload(req, res, function (uploadError) {
    if (uploadError) {
      return res.state(422).send({
        message: errorHandler.getErrorMessage(uploadError)
      });
    } else {
      var path = config.uploads.mark.image.dest + req.file.filename;
      console.log(path);
      path = path.slice(1);
      res.json(path);
    }
  });
};

/**
 * Create a mark
 */
exports.create = function (req, res) {
  var mark = new Mark(req.body);
  mark.user = req.user;

  mark.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(mark);
    }
  });
};

/**
 * Show the current mark
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var mark = req.mark ? req.mark.toJSON() : {};

  // Add a custom field to the Mark, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Mark model.
  mark.isCurrentUserOwner = !!(req.user && mark.user && mark.user._id.toString() === req.user._id.toString());

  res.json(mark);
};

/**
 * Update an mark
 */
exports.update = function (req, res) {
  var mark = req.mark;

  if (req.mark.imageURL !== req.body.imageURL && mark.imageURL !== Mark.schema.path('imageURL').defaultValue) {
    fs.unlink('.' + mark.imageURL, function(unlinkError){
      if(unlinkError){
        console.log(unlinkError);
        return res.status(422).send({
          message: errorHandler.getErrorMessage(unlinkError)
        });
      }
    });
  }

  mark.name = req.body.name;
  mark.imageURL = req.body.imageURL;

  mark.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(mark);
    }
  });
};

/**
 * Delete an mark
 */
exports.delete = function (req, res) {
  var mark = req.mark;

  mark.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
     } else {
      if (mark.imageURL !== Mark.schema.path('imageURL').defaultValue) {
        fs.unlink('.' + mark.imageURL, function(unlinkError){
          if(unlinkError){
            console.log(unlinkError);
            return res.status(422).send({
              message: errorHandler.getErrorMessage(unlinkError)
            });
          } else {
            res.json(mark);
          }
        });
      }
    }
  });
};

/**
 * List of Marks
 */
exports.list = function (req, res) {
  Mark.find().sort('-created').populate('user', 'displayName').exec(function (err, marks) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(marks);
    }
  });
};

/**
 * Mark middleware
 */
exports.markByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Mark is invalid'
    });
  }

  Mark.findById(id).populate('user', 'displayName').exec(function (err, mark) {
    if (err) {
      return next(err);
    } else if (!mark) {
      return res.status(404).send({
        message: 'No mark with that identifier has been found'
      });
    }
    req.mark = mark;
    next();
  });
};
