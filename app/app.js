(function() {
	'use strict';

	 appConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$mdThemingProvider"];
	angular.module('app', 
						[	'app.movieComponent',
							'formly',
							'formlyMaterial',
							'ngResource',
							'ui.router',
							'ngMaterial',
							'ngMessages'
						])

	.config(appConfig);

	  // @ngInject
	  function appConfig($stateProvider, $urlRouterProvider, $mdThemingProvider) {
	    console.log('=== Start Config ===');

	    $urlRouterProvider.otherwise('/');

	    $stateProvider
	      .state('home', {
	        url: '/home',
	        templateUrl: 'components/home.html'
	      })
	      .state('projects', {
	        url: '/projects',
	        templateUrl: 'components/projects.html'
	      })
	
	      	$mdThemingProvider.theme('default')
			    .primaryPalette('indigo')
			    .accentPalette('lime');
		}

})();