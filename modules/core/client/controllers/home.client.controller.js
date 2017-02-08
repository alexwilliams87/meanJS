(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['CalculateService', 'CarsService'];

  function HomeController(CalculateService, CarsService) {
    var vm = this;
    vm.calculate = calculate;
    vm.cars = CarsService.query();

    function calculate(n) {
	   	var tab = CalculateService.calculatePrime(n);
	   	return tab;
   	}
  }
}());
