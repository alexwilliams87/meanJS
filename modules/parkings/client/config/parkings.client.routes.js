(function () {
  'use strict';

  angular
    .module('parkings.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('parkings', {
        abstract: true,
        url: '/parkings',
        template: '<ui-view/>'
      })
      .state('parkings.list', {
        url: '',
        templateUrl: '/modules/parkings/client/views/list-parkings.client.view.html',
        controller: 'ParkingsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Parkings List'
        }
      })
      .state('parkings.view', {
        url: '/:parkingId',
        templateUrl: '/modules/parkings/client/views/view-parking.client.view.html',
        controller: 'ParkingsController',
        controllerAs: 'vm',
        resolve: {
          parkingResolve: getParking
        },
        data: {
          pageTitle: 'Parking {{ parkingResolve.title }}'
        }
      });
  }

  getParking.$inject = ['$stateParams', 'ParkingsService'];

  function getParking($stateParams, ParkingsService) {
    return ParkingsService.get({
      parkingId: $stateParams.parkingId
    }).$promise;
  }
}());
