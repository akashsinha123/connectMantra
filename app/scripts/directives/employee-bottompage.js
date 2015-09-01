'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .directive('employeeBottompage', function () {
    return {
    	restrict: 'E',
	    scope: {
	      
	    },
	    templateUrl: 'views/directives/employee-bottompage.html',
	    link: function(scope, element, attrs){
	    	
	    	

	    }
    }
    


  });
