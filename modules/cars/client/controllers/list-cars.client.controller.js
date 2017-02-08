(function () {
  'use strict';

  angular
    .module('cars')
    .controller('CarsListController', CarsListController);

  CarsListController.$inject = ['CarsService', 'MarksService', '$http', '$window'];

  function CarsListController(CarsService, MarksService, $http, $window) {
    var vm = this;

    vm.cars = CarsService.query();
    vm.marks = MarksService.query();
    vm.generatePdf = generatePdf;

    function generatePdf(car) {

      $http({
        method: 'GET',
        url: '/api/car/' + car._id + '/pdf'
      }).then(function successCallback(response) {
          console.log(response);
          // this callback will be called asynchronously
          // when the response is available
          var path = response.data;
          path = path.slice(1);

          $window.open(path, '_blank');

      }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
      });
    }
  }
}());
