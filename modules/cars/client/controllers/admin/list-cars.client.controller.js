(function () {
  'use strict';

  angular
  .module('cars.admin')
  .controller('CarsAdminListController', CarsAdminListController);

  CarsAdminListController.$inject = ['CarsService', '$window', 'Notification', 'MarksService', '$mdDialog'];

  function CarsAdminListController(CarsService, $window, Notification, MarksService, $mdDialog) {
    var vm 		= this;
    vm.remove 	= remove;
    vm.cars 	= CarsService.query();
    vm.marks = MarksService.query();

    function remove(car, ev) {
      var confirm = $mdDialog.confirm()
          .title('Would you like to delete this car ?')
          .textContent('You are going to delete a car. Would you like to continue ?')
          .ariaLabel('Deleting a car')
          .targetEvent(ev)
          .ok('Yes, I want to do it.')
          .cancel('I do not think so. Leave it alone.');

      $mdDialog.show(confirm).then(function() {
        vm.cars.splice(vm.cars.indexOf(car), 1);
        car.$remove(function() {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Car deleted successfully!' });
        });
      });
    }
  }
}());
