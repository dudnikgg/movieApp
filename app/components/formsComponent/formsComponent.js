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