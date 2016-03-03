(function() {
	'use strict';

	angular.module('app.demoComponent', ['ui.router'])
		.directive('demoComponent', demoComponentFn);

	function demoComponentFn() {
		return {
			restrict: 'A',
			templateUrl: 'components/demoComponent/demoComponents.html'
		};
	}
})();