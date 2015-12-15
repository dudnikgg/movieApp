(function() {
	'use strict';

	angular.module('app.demoComponent', [])
		.directive('demoComponent', demoComponentFn);

	function demoComponentFn() {
		return {
			restrict: 'EA',
			templateUrl: 'components/demoComponent/demoComponents.html'
		}
	}
})();