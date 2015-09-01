'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .directive('userChat', function ($cookieStore, ChatService, CustomerService, SocketService, ComposeService, moment) {
    return {
    	restrict: 'E',
	    scope: {
	      	customer: '=customer',
	      	messages: '=messages',
	      	merchants: '=merchants',
	      	merchant: '=merchant',
	      	timePast: '=timePast',
	      	presentTime: '=presentTime',
		  	fireSubmitMessage: '=fireSubmitMessage',
		  	composedMessagefromTemplate: '=composedMessagefromTemplate'
	    },
	    templateUrl: 'views/directives/user-chat.html',
	    
	    link: function(scope, element, attrs){
	    	var socket = SocketService.socket();
			socket.onopen = function () {
                console.log('Info: WebSocket connection opened.');
            };

            
            scope.$watch('composedMessagefromTemplate', function(value){
            	scope.composedMessage = value;
            	if(scope.fireSubmitMessage){
            		scope.composeMessage();
            		scope.fireSubmitMessage = false;
            	}
            });
            
	    	scope.composeMessage = function(){
	    		var data = {
	    			sessionId: $cookieStore.get('sessionId'),
	    			customerKey: scope.customer.userKey,
	    			merchantKey: scope.merchant.merchantKey,
	    			message: scope.composedMessage
	    		};

	    		ComposeService.create(data)
		    	.then(function(message){
		    		console.log(message);
			        scope.messages.push({messageType: 2, message: message.message});
			        scope.composedMessage = '';
			    })
			    .catch(function(err){
			    	
			    });
			    scope.glued = true;
	    		return false;
	    	};

            socket.onmessage = function (event) {
                var newMessage = JSON.parse(event.data);
                console.log(newMessage);
                scope.presentTime = new Date().getTime();
                newMessage.messageType = 1;
                console.log(newMessage);
                scope.messages.push(newMessage);
                scope.glued = true;
                scope.$digest();
            }
	    }    
    }
    


  });
