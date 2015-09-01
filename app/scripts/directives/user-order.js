'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .directive('userOrder', function (UserOrderService, $cookieStore, ChatService, CustomerService, ComposeService, moment) {
    return {
    	restrict: 'E',
	    scope: {
	      customer: '=customer',
	      messages: '=messages',
	      categories: '=categories',
	      merchants: '=merchants',
	      merchant: '=merchant',
	      search: '=search'
	    },

	    templateUrl: 'views/directives/user-order.html',
	    link: function(scope, element, attrs){

	    	scope.items = [];
	    	scope.itemNames = [];
	    	scope.itemUnitPrice = [];
	    	scope.total = 0;

	    	// scope.count = 0;
	    	// scope.quantity = 1;

	    	scope.quantityIncrement = function(itemUnitPrice, index){
	    		scope.items[index].quantity += 1;
	    		
	    		scope.items[index].itemTotal = scope.items[index].itemUnitPrice*scope.items[index].quantity;
	    		

	    		
	    		
	    	};

	    	scope.quantityDecrement = function(itemUnitPrice, index){
	    		if(scope.items[index].quantity > 1){
	    			scope.items[index].quantity -= 1;
	    		}
	    		
	    		scope.items[index].itemTotal = scope.items[index].itemUnitPrice*scope.items[index].quantity;
	    		
	    		
	    	}



	    	scope.addItem = function(inven, index){
		    		scope.items.push(inven);
		    		scope.itemNames.push(inven.itemName);
		    		scope.itemUnitPrice.push(inven.itemUnitPrice);
		    		for (var i = 0; i < scope.items.length; i++) {
		    			
		    			if(!scope.items[i].quantity){

		    				scope.items[i].quantity = 1;

		    			}

		    			if(!scope.items[i].itemTotal){

		    				scope.items[i].itemTotal = scope.items[i].itemUnitPrice;

		    			}
		    		};

		    		scope.inventory.splice(index, 1);
	    	};

	    	scope.removeItem = function(index, item){
			    scope.items.splice(index, 1);
			    scope.itemNames.splice(index,1);
			    scope.itemUnitPrice.splice(index,1);
			    scope.inventory.push(item);
			};

			
			scope.inventory = function(){
	    		var data = {
		    		sessionId: $cookieStore.get('sessionId'),
		    		merchantKey: scope.merchant.merchantKey
		    	}
		    	scope.merchantKey = scope.merchant.merchantKey;

		    	UserOrderService.fetch(data)
			    .then(function(inventory){
			        scope.inventory = inventory.response.body.inventory;
			        console.log(scope.inventory);
			    })
			    .catch(function(err){

			    });
	    	};




	    	scope.countTotal = function(){
	    		scope.sumTotal();
	    	};

	    	scope.sumTotal = function(){

	    		var cost = 0;

	    		for (var i = 0; i < scope.items.length; i++) {
	    			cost += scope.items[i].itemTotal;
	    		};
	    		return cost;

	    	};

	    	scope.finalTotal = function(){

	    		var cost = scope.sumTotal();

	    		var delivery = cost + 49;

	    		var convenience = delivery + 10;

	    		scope.grandTotal = convenience - 100;

	    		cost = 0;
	    		delivery = 0;
	    		convenience = 0;

	    	}
	    	
	    	

	    	scope.placeOrder = function() {

	    		var data = 
	    		{
	    			status: 1,
	    			merchantKey: scope.merchantKey,
	    			appKey: "2b11d3ccacf3b2f7675532bfd0c0bfdf",
	    			sessionId: $cookieStore.get('sessionId'),
	    			customerKey: scope.customer.userKey,
	    			userKey: "e8441ce0964c2581ff86f3c41b7981e4",
	    			data: 	JSON.stringify({items: 
    							[
									{
										 acocuntId: 1,
										 created: moment().toString(),
										 id: 1,
										 itemDescription: "Fuji Apple - 500 gm",
										 itemName: scope.itemNames,
										 itemQuantity: 1,
										 itemSku: "Fuji Apple - 500 gm",
										 itemUnitPrice: scope.itemUnitPrice,
										 merchantId: 1,
										 orderId: 4,
										 status: 1,
										 totalItemPrice: scope.grandTotal,
										 userId: 1
									}
							 	]
							})
	    		};

	    		UserOrderService.create(data)
	    		.then(function(list){
			        console.log(list);
			    })
			    .catch(function(err){
			    	console.log(err);
			    });
	    	};



	    }
    }
    


  });
