(function () {
  'use strict';

  angular
    .module('parkings')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Parkings',
      state: 'parkings',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'parkings', {
      title: 'List Parkings',
      state: 'parkings.list',
      roles: ['*']
    });
  }
}());
