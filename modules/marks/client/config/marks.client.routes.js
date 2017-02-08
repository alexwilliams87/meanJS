(function () {
  'use strict';

  angular
    .module('marks.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('marks', {
        abstract: true,
        url: '/marks',
        template: '<ui-view/>'
      })
      .state('marks.list', {
        url: '',
        templateUrl: '/modules/marks/client/views/list-marks.client.view.html',
        controller: 'MarksListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Marks List'
        }
      })
      .state('marks.view', {
        url: '/:markId',
        templateUrl: '/modules/marks/client/views/view-mark.client.view.html',
        controller: 'MarksController',
        controllerAs: 'vm',
        resolve: {
          markResolve: getMark
        },
        data: {
          pageTitle: 'Mark {{ markResolve.title }}'
        }
      });
  }

  getMark.$inject = ['$stateParams', 'MarksService'];

  function getMark($stateParams, MarksService) {
    return MarksService.get({
      markId: $stateParams.markId
    }).$promise;
  }
}());
