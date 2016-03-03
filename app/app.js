(function() {
	'use strict';

	 appConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
	angular.module('app', ['app.demoComponent', 'formly', 'formlyMaterial', 'ngResource', 'ui.router', 'ngMaterial'] )


	.config(appConfig);

	  // @ngInject
	  function appConfig($stateProvider, $urlRouterProvider, $mdThemingProvider) {
	    console.log('=== Start Config ===');

	    $urlRouterProvider.otherwise('/');

	    $stateProvider
	      .state('home', {
	        url: '/',
	        templateUrl: 'components/home.html'
	      })
	      .state('demoComponent', {
	        url: '/demoComponent',
	        templateUrl: 'components/demoComponent/demoComponents.html'
	      })
	      
	      
	      // Configure a dark theme with primary foreground yellow
	   //  $mdThemingProvider.theme('docs-dark', 'default')
	   //  	.primaryPalette('indigo')
    // 		.accentPalette('green');
	  	};
	  
})();