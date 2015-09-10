'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .directive('employeeHeader', function ($location, $cookieStore, LogoutService) {
    return {
    	restrict: 'E',
	    scope: {
	      
	    },
	    templateUrl: 'views/directives/employee-header.html',
	    link: function(scope, element, attrs){

	    	window.scope = scope;
	    	scope.getClass = function (path) {
			  if ($location.path().substr(0, path.length) === path) {
			    return 'first active';
			  } else {
			    return '';
			  }
			};

			scope.user_name = $cookieStore.get('userName');

			scope.logout = function(){
				var data = {
		            sessionId : $cookieStore.get('sessionId')
		        }

		        LogoutService.logout(data)
		        .then(function(user){
		            // console.log(user);
		        })
		        .catch(function(err){
		            
		        });

		        $cookieStore.put('sessionId', "");
			}
	    }
    }
    


  });
