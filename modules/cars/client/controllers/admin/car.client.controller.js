(function () {
  'use strict';

  angular
    .module('cars.admin')
    .controller('CarsAdminController', CarsAdminController);

  CarsAdminController.$inject = ['$scope', '$state', '$window', 'carResolve', 'Authentication', 'Notification', 'MarksService', '$timeout', 'Upload'];

  function CarsAdminController($scope, $state, $window, car, Authentication, Notification, MarksService, $timeout, Upload) {
    var vm = this;

    vm.car = car;
    vm.authentication = Authentication;
    vm.marks = MarksService.query();
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.progress = 0;

    // Remove existing Car
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.car.$remove(function() {
          $state.go('admin.cars.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Car deleted successfully!' });
        });
      }
    }

    // Save Car
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.carForm');
        return false;
      }

      // test if file selected for upload
      if (vm.fileSelected) {
        Upload.upload({
          // using this route from car.server.routes.js
          url: '/api/carUploadImage',
          data: {
            newCarPicture: vm.carFileImage
          }
        }).then(function (response) {
          $timeout(function () {
            onSuccessItem(response.data);
          });
        }, function (response) {
          if (response.status > 0) onErrorItem(response.data);
        }, function (evt) {
          vm.progress = parseInt(100.0 * evt.loaded / evt.total, 10);
        });

        // Called after the user has successfully uploaded a new picture
        function onSuccessItem(response) {
          // Show success message
          console.log(response);
          vm.car.imageURL = response;

          vm.car.createOrUpdate()
            .then(successCallback)
            .catch(errorCallback);
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Successfully changed car picture' });
        }
      } else {
        vm.car.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);
      }

      // Called after the user has failed to upload a new picture
      function onErrorItem(response) {
        vm.fileSelected = false;
        vm.progress = 0;

        // Show error message
        Notification.error({ message: response.message, title: '<i class="glyphicon glyphicon-remove"></i> Failed to change mark picture' });
      }

      // Create a new car, or update the current instance
      // vm.car.createOrUpdate()
      //   .then(successCallback)
      //   .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.cars.list'); // should we send the User to the list or the updated Car's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Car saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Car save error!' });
      }
    }
  }
}());
