'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .controller('ChangePasswordCtrl', function ($scope, $location, $cookieStore, EmployeeService, $rootScope, AskService, LanguageService, md5) {

    if (EmployeeService.changepassword != "yesDoId") {
        $location.path('/confirmpassword');
    };

    $scope.isloggedIn = function(){
        var data = {
            sessionId : $cookieStore.get('sessionId'),
        }
        EmployeeService.isloggedIn(data)
        .then(function(user){
          if (user != "true") {
            $location.path('/login');
          };
        })
        .catch(function(err){
            
        });
    }

    $scope.isloggedIn();

    

    $scope.changePassword = function(pass){
        if (pass.newPassword == pass.repeatPassword) {
            $scope.md5password = md5.createHash(pass.newPassword || '');
            var data = {
                sessionId : $cookieStore.get('sessionId'),
                password : $scope.md5password,
                id: $cookieStore.get('userId')
            }
            EmployeeService.changePassword(data)
            .then(function(user){
                console.log(user);
                if (user == '1 records UPDATED successfully') {
                    $scope.done = true;
                };
              
            })
            .catch(function(err){
                
            });
        }else{
            $scope.notMatched = true;
        }
        
    }

  });
























