(function () {
  'use strict';

  angular
    .module('parkings')
    .controller('ParkingsController', ParkingsController);

  ParkingsController.$inject = ['$scope', 'parkingResolve', 'Authentication', 'CarsService', 'MarksService'];

  function ParkingsController($scope, parking, Authentication, CarsService, MarksService) {
    var vm = this;

    vm.parking = parking;
    vm.authentication = Authentication;
    vm.cars = CarsService.query();
    vm.marks = MarksService.query();

  }
}());
