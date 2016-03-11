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
(function() {
	'use strict';

		movieFactory.$inject = ["$resource", "$stateParams"];
		moviesController.$inject = ["$scope", "$resource", "movieFactory", "$stateParams", "$window"];
		movieViewController.$inject = ["$scope", "$resource", "movieFactory", "$stateParams"];
		movieAddController.$inject = ["$scope", "$resource", "$state", "movieFactory", "$stateParams"];
		movieEditController.$inject = ["$scope", "$resource", "$state", "movieFactory", "$stateParams"];
	moviesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
	angular.module('app.movieComponent', ['ui.router'])
		.config(moviesConfig)
		.directive('movieComponent', movieComponentFn) 
		.factory('movieFactory', movieFactory)
		.controller('moviesController', moviesController)
		.controller('movieViewController', movieViewController)
		.controller('movieAddController', movieAddController)
		.controller('movieEditController', movieEditController)
		
		 // @ngInject
	  	function moviesConfig($stateProvider, $urlRouterProvider) {

	    	$stateProvider
	    	.state('movies', {
	        		url: '/movies',
	        		templateUrl: 'components/moviesComponent/moviesComponent.html',
	        		controller: 'moviesController'
	      	})
	      	.state('movieView', {
	        		url: '/movies/movie/:id',
	        		templateUrl: 'components/moviesComponent/movieView.html',
	        		controller: 'movieViewController'
	      	})
	      	.state('movieAdd', { 
				    url: '/movies/add',
				    templateUrl: 'components/moviesComponent/movieAdd.html',
				    controller: 'movieAddController'
			})
			.state('movieEdit', { 
				    url: '/movies/edit/:id',
				    templateUrl: 'components/moviesComponent/movieEdit.html',
				    controller: 'movieEditController'
			})
		}

		function movieComponentFn() {
			// Runs during compile
			return {
				name: 'Movies',
				restrict: 'AEC', // E = Element, A = Attribute, C = Class, M = Comment
				templateUrl: 'components/moviesComponent/moviesComponent.html'		
			};
		}
		function movieFactory($resource, $stateParams) {
			return $resource("/api/movies/:id", { id: '@_id' }, {
		    	update: { method: 'PUT' }
			})
			 // Don't strip trailing slashes from calculated URLs
  			$resourceProvider.defaults.stripTrailingSlashes = false;
		};
		function moviesController($scope, $resource, movieFactory, $stateParams, $window) {
			$scope.movies = movieFactory.query();

			$scope.deleteMovie = function(movie) {
		      movie.$delete(function() {
		        $window.location.reload(); 
		      });
		    };
		}
		function movieViewController($scope, $resource, movieFactory, $stateParams) {
			$scope.movie = movieFactory.get({ id: $stateParams.id });
		}
		function movieAddController($scope, $resource, $state, movieFactory, $stateParams) {
			$scope.movie = new movieFactory();

			$scope.addMovie = function() { 
		    	$scope.movie.$save(function() {
		      		$state.go('movies');
		    	});
			}
		}
		function movieEditController($scope, $resource, $state, movieFactory, $stateParams) {
			$scope.movie = movieFactory.get({ id: $stateParams.id });

			$scope.editMovie = function() { 
			    $scope.movie.$update(function() {
			      $state.go('movies'); 
			    });
			}
		}
		
		// $scope.loadMovie = function() { //Issues a GET request to /api/movies/:id to get a movie to update
		//     $scope.movie = Movie.get({ id: $stateParams.id });
		//   };

		// $scope.loadMovie(); // Load a movie which can be edited on UI
})();