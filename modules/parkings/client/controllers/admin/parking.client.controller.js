(function () {
  'use strict';

  angular
    .module('parkings.admin')
    .controller('ParkingsAdminController', ParkingsAdminController);

  ParkingsAdminController.$inject = ['$scope', '$state', '$window', 'parkingResolve', 'Authentication', 'Notification', 'CarsService', 'MarksService'];

  function ParkingsAdminController($scope, $state, $window, parking, Authentication, Notification, CarsService, MarksService) {
    var vm = this;

    vm.parking = parking;
    vm.authentication = Authentication;
    vm.form = {};
    vm.cars = CarsService.query();
    vm.marks = MarksService.query();
    vm.remove = remove;
    vm.save = save;
    vm.progress = 0;

    // Remove existing Parking
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.parking.$remove(function() {
          $state.go('admin.parkings.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Parking deleted successfully!' });
        });
      }
    }

    // Save Parking
    function save(isValid) {
      if (!isValid) {
        return false;
      }

    vm.parking.createOrUpdate()
      .then(successCallback)
      .catch(errorCallback);
    }


      // Create a new parking, or update the current instance
      // vm.parking.createOrUpdate()
      //   .then(successCallback)
      //   .catch(errorCallback);

    function successCallback(res) {
      $state.go('admin.parkings.list'); // should we send the User to the list or the updated Parking's view?
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Parking saved successfully!' });
    }

    function errorCallback(res) {
      Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Parking save error!' });
    }
  }
}());
