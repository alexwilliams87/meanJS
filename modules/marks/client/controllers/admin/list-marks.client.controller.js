(function () {
  'use strict';

  angular
  .module('marks.admin')
  .controller('MarksAdminListController', MarksAdminListController);

  MarksAdminListController.$inject = ['MarksService', '$window', 'Notification', '$mdDialog'];

  function MarksAdminListController(MarksService, $window, Notification, $mdDialog) {
    var vm 		= this;
    vm.remove 	= remove;
    vm.marks 	= MarksService.query();

    function remove(mark, ev) {

      var confirm = $mdDialog.confirm()
          .title('Would you like to delete this mark ?')
          .textContent('You are going to delete a mark. Would you like to continue ?')
          .ariaLabel('Deleting a mark')
          .targetEvent(ev)
          .ok('Yes, I want to do it.')
          .cancel('I do not think so. Leave it alone.');

      $mdDialog.show(confirm).then(function() {
        vm.marks.splice(vm.marks.indexOf(mark), 1);
        mark.$remove(function() {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Mark deleted successfully!' });
        });
      });
    }
  }
}());
