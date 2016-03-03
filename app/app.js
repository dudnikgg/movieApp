(function() {
	'use strict';

	 appConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
	angular.module('app', ['app.demoComponent', 'app.formsComponent', 'formly', 'formlyMaterial', 'ngResource', 'ui.router', 'ngMaterial'] )


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
	      .state('firstStepRegistration', {
	        url: '/formsComponent/firstStepRegistration',
	        controller: 'formsController',
	        templateUrl: 'components/formsComponent/firstStepRegistration.html'
	      })
	      .state('secondStepRegistration', {
	        url: '/formsComponent/secondStepRegistration',
	        controller: 'formsController',
	        templateUrl: 'components/formsComponent/secondStepRegistration.html'
	      })
	      .state('thirdStepRegistration', {
	        url: '/formsComponent/thirdStepRegistrationt',
	        controller: 'formsController',
	        templateUrl: 'components/formsComponent/thirdStepRegistration.html'
	      })
	      
	      // Configure a dark theme with primary foreground yellow
	    	$mdThemingProvider.theme('docs-dark', 'default')
	      	.primaryPalette('blue')
    		.accentPalette('green');
	  };
	  
})();