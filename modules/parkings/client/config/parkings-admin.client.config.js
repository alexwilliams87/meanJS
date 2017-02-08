(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('parkings.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Parkings',
      state: 'admin.parkings.list'
    });
  }
}());
