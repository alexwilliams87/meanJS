(function () {
  'use strict';

  angular
  .module('parkings.admin')
  .controller('ParkingsAdminListController', ParkingsAdminListController);

  ParkingsAdminListController.$inject = ['ParkingsService', '$window', 'Notification', '$mdDialog'];

  function ParkingsAdminListController(ParkingsService, $window, Notification, $mdDialog) {
    var vm 		= this;
    vm.remove 	= remove;
    vm.parkings 	= ParkingsService.query();

    function remove(parking, ev) {

      var confirm = $mdDialog.confirm()
          .title('Would you like to delete this parking ?')
          .textContent('You are going to delete a parking. Would you like to continue ?')
          .ariaLabel('Deleting a parking')
          .targetEvent(ev)
          .ok('Yes, I want to do it.')
          .cancel('I do not think so. Leave it alone.');

      $mdDialog.show(confirm).then(function() {
        vm.parkings.splice(vm.parkings.indexOf(parking), 1);
        parking.$remove(function() {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Parking deleted successfully!' });
        });
      });
    }
  }
}());
