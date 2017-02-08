(function () {
'use strict';

	angular
	.module('core')
	.service('CalculateService', CalculateService);

	function CalculateService() {

		this.isPrime = function(number) {
			for(var i=2; i<number; i++) {
				if(number % i === 0){
					return false;
				}
			}
			return true;
		};

		this.calculatePrime = function(lim) {
			var tab = [];
			var i = 1;
			while (tab.length < lim) {
				i++;
				if(this.isPrime(i)) {
					tab.push(i);
				}
			}
			return tab;
		};

	}

}());