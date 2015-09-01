'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .directive('employeeFooter', function () {
    return {
    	restrict: 'E',
	    scope: {
	      
	    },
	    templateUrl: 'views/directives/employee-footer.html',
	    link: function(scope, element, attrs){
	    	
	    	

	    }
    }
    


  });
