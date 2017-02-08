'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  fs = require('fs'),
  mongoose = require('mongoose'),
  Car = mongoose.model('Car'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  pdf = require('html-pdf'),
  handlebars = require('handlebars');


exports.carCreatePdf = function (req, res) {
  var car = req.car;
  console.log('createPdf');
  var path = "./modules/cars/server/views/";
  var html = fs.readFileSync(path + 'car.server.views.template.html', 'utf8');
  var options = { format: 'Letter' };

  // var template est la compilation du template 'html' soit la structure avant l'incorporation des données de CAR
  var template = handlebars.compile(html);

  // var result est l'incorporation des valeurs contenues dans CAR
  var result = template(car);


  pdf.create(result, options).toFile('./modules/cars/client/views/pdf/' + req.car.id + '.pdf', function(err, resultat) {
    if (err) return console.log(err);
    res.json('./modules/cars/client/views/pdf/' + req.car.id + '.pdf'); // { filename: '/app/businesscard.pdf' } 
  });
};

exports.carUploadImage = function (req, res) {
  // Filtering to upload only images
  var multerConfig = config.uploads.car.image;
  multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;
  var upload = multer(multerConfig).single('newCarPicture');

  upload(req, res, function (uploadError) {
    if (uploadError) {
      return res.state(422).send({
        message: errorHandler.getErrorMessage(uploadError)
      });
    } else {
      var path = config.uploads.car.image.dest + req.file.filename;
      console.log(path);
      path = path.slice(1);
      res.json(path);
    }
  });
};

/**
 * Create an car
 */
exports.create = function (req, res) {
  var car = new Car(req.body);
  car.user = req.user;

  car.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(car);
    }
  });
};

/**
 * Show the current car
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var car = req.car ? req.car.toJSON() : {};

  // Add a custom field to the Car, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Car model.
  car.isCurrentUserOwner = !!(req.user && car.user && car.user._id.toString() === req.user._id.toString());

  res.json(car);
};

/**
 * Update an car
 */
exports.update = function (req, res) {
  var car = req.car;

  if (req.car.imageURL !== req.body.imageURL && car.imageURL !== Car.schema.path('imageURL').defaultValue) {
    fs.unlink('.' + car.imageURL, function(unlinkError){
      if(unlinkError){
        console.log(unlinkError);
        return res.status(422).send({
          message: errorHandler.getErrorMessage(unlinkError)
        });
      }
    });
  }
  
  car.mark = req.body.mark;
  car.model = req.body.model;
  car.power = req.body.power;
  car.fuel = req.body.fuel;
  car.imageURL = req.body.imageURL;

  car.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(car);
    }
  });
};

/**
 * Delete an car
 */
exports.delete = function (req, res) {
  var car = req.car;

  car.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      if (car.imageURL !== Car.schema.path('imageURL').defaultValue) {
        fs.unlink('.' + car.imageURL, function(unlinkError){
          if(unlinkError){
            console.log(unlinkError);
            return res.status(422).send({
              message: errorHandler.getErrorMessage(unlinkError)
            });
          } else {
            res.json(car);
          }
        });
      }
    }
  });
};

/**
 * List of Cars
 */
exports.list = function (req, res) {
  Car.find().sort('-created').populate('user', 'displayName').populate('mark', 'name').exec(function (err, cars) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cars);
    }
  });
};

/**
 * Car middleware
 */
exports.carByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Car is invalid'
    });
  }

  Car.findById(id).populate('user', 'displayName').populate('mark').exec(function (err, car) {
    if (err) {
      return next(err);
    } else if (!car) {
      return res.status(404).send({
        message: 'No car with that identifier has been found'
      });
    }
    req.car = car;
    next();
  });
};