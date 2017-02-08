(function () {
  'use strict';

  angular
    .module('cars.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('cars', {
        abstract: true,
        url: '/cars',
        template: '<ui-view/>'
      })
      .state('cars.list', {
        url: '',
        templateUrl: '/modules/cars/client/views/list-cars.client.view.html',
        controller: 'CarsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Cars List'
        }
      })
      .state('cars.view', {
        url: '/:carId',
        templateUrl: '/modules/cars/client/views/view-car.client.view.html',
        controller: 'CarsController',
        controllerAs: 'vm',
        resolve: {
          carResolve: getCar
        },
        data: {
          pageTitle: 'Car {{ carResolve.title }}'
        }
      });
  }

  getCar.$inject = ['$stateParams', 'CarsService'];

  function getCar($stateParams, CarsService) {
    return CarsService.get({
      carId: $stateParams.carId
    }).$promise;
  }
}());
