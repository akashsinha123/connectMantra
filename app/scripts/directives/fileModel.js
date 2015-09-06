'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .directive('fileModel', function ($location, $cookieStore, EmployeeService, $parse) {
    return {
    	restrict: 'A',
	    link: function postLink(scope, element, attrs) {
          

          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;

          element.bind('change', function(){
            scope.$apply(function(){
              modelSetter(scope, element[0].files[0]);
            })
          })


        


      }
    }
    


  });
