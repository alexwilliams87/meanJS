(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('cars.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Cars',
      state: 'admin.cars.list'
    });
  }
}());
