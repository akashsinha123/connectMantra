'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .controller('ForgotPasswordCtrl', function ($scope, $location, $cookieStore, EmployeeService, $rootScope, AskService, LanguageService, md5) {
    $scope.showMsgss = null;

    $scope.sendMail = function(pass){
        var data = {
            gmail : pass.gmail
        }
        EmployeeService.sendMail(data)
        .then(function(user){
          console.log(user);
          if (user == 'Sent') {
            $scope.showMsgss = true;
            $scope.showMsg = "A mail has been sent to your email account."
          };
        })
        .catch(function(err){
            
        });
    }
    


  });
























