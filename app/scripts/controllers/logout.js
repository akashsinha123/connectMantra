'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .controller('LogoutCtrl', function ($scope, $location, $cookieStore) {
   
    $scope.loginPage = function(){
        $location.path('/login');
    }

  });
