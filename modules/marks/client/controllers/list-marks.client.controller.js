(function () {
  'use strict';

  angular
    .module('marks')
    .controller('MarksListController', MarksListController);

  MarksListController.$inject = ['MarksService'];

  function MarksListController(MarksService) {
    var vm = this;

    vm.marks = MarksService.query();
  }
}());
