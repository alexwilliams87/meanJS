(function () {
  'use strict';

  angular
    .module('parkings')
    .controller('ParkingsListController', ParkingsListController);

  ParkingsListController.$inject = ['ParkingsService'];

  function ParkingsListController(ParkingsService) {
    var vm = this;

    vm.parkings = ParkingsService.query();
  }
}());
