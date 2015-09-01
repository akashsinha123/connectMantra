'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .directive('userMessage', function () {
    return {
    	restrict: 'E',
	    scope: {
	      fireSubmitMessage: '=fireSubmitMessage',
	      composedMessagefromTemplate: '=composedMessagefromTemplate'
	    },
	    templateUrl: 'views/directives/user-message.html',
	    
	    link: function(scope, element, attrs){
	    	
	    	scope.messages = [
	    		{message: "May i help you order today?"},
	    		{message: "We have a special offer from spencer's today. Order products worth Rs 500 and get Rs 100 off."},
	    		{message: "Sorry sir for inconvenience caused. We have checked with merchant and they are delivering your order within 15 minutes."},
	    		{message: "May i help you order today?"},
	    		{message: "We have a special offer from spencer's today. Order products worth Rs 500 and get Rs 100 off."},
	    		{message: "Sorry sir for inconvenience caused. We have checked with merchant and they are delivering your order within 15 minutes."}
	    	];

	    	scope.fillMessageField = function(message){
	    		scope.composedMessagefromTemplate = message;
	    	};
	    	
	    	scope.sendMessage = function(message){
	    		scope.fireSubmitMessage = true;
	    		scope.composedMessagefromTemplate = message;
	    		
	    	};
	    	
	    }
    }
    


  });
