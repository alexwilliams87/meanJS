(function () {
  'use strict';

  angular
    .module('marks.admin')
    .controller('MarksAdminController', MarksAdminController);

  MarksAdminController.$inject = ['$scope', '$state', '$window', 'markResolve', 'Authentication', 'Notification', '$timeout', 'Upload'];

  function MarksAdminController($scope, $state, $window, mark, Authentication, Notification, $timeout, Upload) {
    var vm = this;

    vm.mark = mark;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.progress = 0;

    // Remove existing Mark
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.mark.$remove(function() {
          $state.go('admin.marks.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Mark deleted successfully!' });
        });
      }
    }

    // Save Mark
    function save(isValid) {
      if (!isValid) {
        return false;
      }

      if (vm.fileSelected) {
        Upload.upload({
          url: '/api/markUploadImage',
          data: {
            newMarkPicture: vm.markFileImage
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
          vm.mark.imageURL = response;

          vm.mark.createOrUpdate()
            .then(successCallback)
            .catch(errorCallback);
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Successfully changed mark picture' });
        }
      } else {
        vm.mark.createOrUpdate()
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


      // Create a new mark, or update the current instance
      // vm.mark.createOrUpdate()
      //   .then(successCallback)
      //   .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.marks.list'); // should we send the User to the list or the updated Mark's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Mark saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Mark save error!' });
      }
    }
  }
}());
