(function () {
  'use strict';

  angular
    .module('parkings.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.parkings', {
        abstract: true,
        url: '/parkings',
        template: '<ui-view/>'
      })
      .state('admin.parkings.list', {
        url: '',
        templateUrl: '/modules/parkings/client/views/admin/list-parkings.client.view.html',
        controller: 'ParkingsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.parkings.create', {
        url: '/create',
        templateUrl: '/modules/parkings/client/views/admin/form-parking.client.view.html',
        controller: 'ParkingsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          parkingResolve: newParking
        }
      })
      .state('admin.parkings.edit', {
        url: '/:parkingId/edit',
        templateUrl: '/modules/parkings/client/views/admin/form-parking.client.view.html',
        controller: 'ParkingsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          parkingResolve: getParking
        }
      });
  }

  getParking.$inject = ['$stateParams', 'ParkingsService'];

  function getParking($stateParams, ParkingsService) {
    return ParkingsService.get({
      parkingId: $stateParams.parkingId
    }).$promise;
  }

  newParking.$inject = ['ParkingsService'];

  function newParking(ParkingsService) {
    return new ParkingsService();
  }
}());
