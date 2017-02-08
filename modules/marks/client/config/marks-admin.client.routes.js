(function () {
  'use strict';

  angular
    .module('marks.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.marks', {
        abstract: true,
        url: '/marks',
        template: '<ui-view/>'
      })
      .state('admin.marks.list', {
        url: '',
        templateUrl: '/modules/marks/client/views/admin/list-marks.client.view.html',
        controller: 'MarksAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.marks.create', {
        url: '/create',
        templateUrl: '/modules/marks/client/views/admin/form-mark.client.view.html',
        controller: 'MarksAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          markResolve: newMark
        }
      })
      .state('admin.marks.edit', {
        url: '/:markId/edit',
        templateUrl: '/modules/marks/client/views/admin/form-mark.client.view.html',
        controller: 'MarksAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          markResolve: getMark
        }
      });
  }

  getMark.$inject = ['$stateParams', 'MarksService'];

  function getMark($stateParams, MarksService) {
    return MarksService.get({
      markId: $stateParams.markId
    }).$promise;
  }

  newMark.$inject = ['MarksService'];

  function newMark(MarksService) {
    return new MarksService();
  }
}());
