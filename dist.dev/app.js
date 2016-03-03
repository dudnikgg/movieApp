(function() {
	'use strict';

	 appConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$mdThemingProvider"];
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
(function() {
	'use strict';

	angular.module('app.formsComponent', ['ui.router'])
		.controller('formsController', formsComponentCtrl);


	function formsComponentCtrl() {
		var vm = this;

		vm.test = "tett";

		vm.form = {};

		vm.formFields = [
			{
			  type: "input",
			  key: "first_name",
			  templateOptions: {
			    type: "text",
			    label: "First name",
			    placeholder: 'Enter your first name',
			    pattern: "[A-Za-z]+",
			    theme: "custom",
			    required: true
			  },
			  	validation: {
			  		"messages": {},
	      			"errorExistsAndShouldBeVisible": true
				}
			},
	        {	
	        	type: 'input',
	            key: 'last_name',
	            templateOptions: {
	                type: 'text',
	                label: 'Last Name',
	                placeholder: 'Enter your last name',
	                required: true
	            }
	        },
	        {	
	        	type: 'input',
	            key: 'email',     
	            templateOptions: {
	                type: 'email',
	                label: 'Email address',
	                placeholder: 'Enter email',
	                required: true
	            }
	        }
	    ];
	}
})();