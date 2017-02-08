(function () {
  'use strict';

  angular.module('core')
    .directive('jrTable', jrTable);

  function jrTable() {
    var directive = {
      restrict: 'EA',
      transclude: false,
      scope: {data: '=jrTableData', headers: '=jrTableHeaders'},
      templateUrl:'/modules/core/client/directives/templates/table.client.directive.template.html'
    };

    return directive;


  }
}());
