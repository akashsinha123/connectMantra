'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .controller('ConfirmPasswordCtrl', function ($scope, $location, $cookieStore, EmployeeService, $rootScope, AskService, LanguageService, md5) {

    $scope.isloggedIn = function(){
        var data = {
            sessionId : $cookieStore.get('sessionId'),
        }
        EmployeeService.isloggedIn(data)
        .then(function(user){
          console.log(user);
          if (user != "true") {
            $location.path('/login');
          };
        })
        .catch(function(err){
            
        });
    }

    $scope.isloggedIn();

    $scope.oldPassword = "";


    $scope.oldPassword = function(pass){
        $scope.md5password = md5.createHash(pass.password || '');
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            password : $scope.md5password,
            id: $cookieStore.get('userId')
        }
        EmployeeService.oldPassword(data)
        .then(function(user){
          if (user != "true") {
            $scope.errorMsg = true;
          }else if(user == "true"){
            EmployeeService.changepassword = "yesDoId";
            $location.path('/changepassword');
          }
        })
        .catch(function(err){
            
        });
    }

  });
























