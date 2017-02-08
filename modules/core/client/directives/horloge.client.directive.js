(function () {
  'use strict';


  angular.module('core').directive('reverse', function() {
   
    return {
      restrict: 'E',

      template: '<button>test</button>',

      replace: true,

      link: function(scope, elem, attr) {
        elem.text('test');
      }
    };
  });

}());
