(function () {
  'use strict';

  angular
    .module('core')
    .filter('NotNeuf', NotNeuf);

    function NotNeuf()
    {
    	return function(arr) {

    		var tab = [];
    		for (var i in arr) {
    			if (arr[i] % 10 !== 9) {
    				tab.push(arr[i]);
    			}
    		}

    		return tab;

    	}
    }

}());