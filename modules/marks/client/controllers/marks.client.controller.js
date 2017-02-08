(function () {
  'use strict';

  angular
    .module('marks')
    .controller('MarksController', MarksController);

  MarksController.$inject = ['$scope', 'markResolve', 'Authentication'];

  function MarksController($scope, mark, Authentication) {
    var vm = this;

    vm.mark = mark;
    vm.authentication = Authentication;

  }
}());
