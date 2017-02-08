(function () {
  'use strict';

  angular
    .module('parkings.services')
    .factory('ParkingsService', ParkingsService);

  ParkingsService.$inject = ['$resource', '$log'];

  function ParkingsService($resource, $log) {
    var Parking = $resource('/api/parkings/:parkingId', {
      parkingId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Parking.prototype, {
      createOrUpdate: function () {
        var parking = this;
        return createOrUpdate(parking);
      }
    });

    return Parking;

    function createOrUpdate(parking) {
      if (parking._id) {
        return parking.$update(onSuccess, onError);
      } else {
        return parking.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(parking) {
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
