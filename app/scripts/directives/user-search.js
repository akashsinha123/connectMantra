'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .directive('userSearch', function ($cookieStore, ChatService, CustomerService, SocketService, moment, UserService, $location) {
    return {
    	restrict: 'E',
	    scope: {
	      customer: '=customer',
	      messages: '=messages',
	      categories: '=categories',
	      merchants: '=merchants',
	      timePast: '=timePast',
	      presentTime: '=presentTime'
	    },
	    templateUrl: 'views/directives/user-search.html',
	    link: function(scope, element, attrs){
	    	var data = {
	            //appKey: $cookieStore.get('appKey'), 
	            sessionId: $cookieStore.get('sessionId')
		    };


		 //    CustomerService.fetch(data)
			//     .then(function(customers){
			//     	if(customers){
			// 	        scope.customers = customers.response.body.customers;
			// 	        scope.categories = customers.response.body.categories;
			// 	        scope.merchants = customers.response.body.merchants;
			//     	}

			//     })
			//     .catch(function(err){
			//     	$location.path('/');
			//     });

		 //    setInterval(function(){
		 //    	CustomerService.fetch(data)
			//     .catch(function(err){
			//     	$location.path('/');
			//     });
			// }, 60000);

		    scope.customerSelected = function(customer){
		    	scope.customer = customer;

		    	var data2 = {
		    		sessionId: $cookieStore.get('sessionId'),
		    		customerKey: customer.userKey
		    	};

		    	ChatService.fetch(data2)
		    	.then(function(messages){
			        scope.messages = messages.response.body.messages;
			    })
			    .catch(function(err){
			    	
			    });

		    };



		    scope.moment = moment();
		    scope.moment.lang('en');
		    scope.duration = scope.moment.fromNow(scope.presentTime);
		    // scope.moment = moment();
		    // scope.moment.lang('en');
		    // console.log(scope.moment.fromNow());

		    
	    }
    }
    


  });
