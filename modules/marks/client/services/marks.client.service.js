(function () {
  'use strict';

  angular
    .module('marks.services')
    .factory('MarksService', MarksService);

  MarksService.$inject = ['$resource', '$log'];

  function MarksService($resource, $log) {
    var Mark = $resource('/api/marks/:markId', {
      markId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Mark.prototype, {
      createOrUpdate: function () {
        var mark = this;
        return createOrUpdate(mark);
      }
    });

    return Mark;

    function createOrUpdate(mark) {
      if (mark._id) {
        return mark.$update(onSuccess, onError);
      } else {
        return mark.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(mark) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
