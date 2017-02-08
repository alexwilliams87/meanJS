(function () {
  'use strict';

  angular
    .module('marks')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Marks',
      state: 'marks',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'marks', {
      title: 'List Marks',
      state: 'marks.list',
      roles: ['*']
    });
  }
}());
