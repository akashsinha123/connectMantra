'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .controller('SignupCtrl', function ($scope, $location, $cookieStore, LoginService, md5) {

    $scope.signUp = function(){
        if ($scope.user.password == $scope.user.confirmPassword && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.user.email_id)) {

            $scope.md5password = md5.createHash($scope.user.password || '');
            $scope.md5username = md5.createHash($scope.user.username || '');
            
            var data = {
                username: $scope.user.username,
                name: $scope.user.name,
                email_id : $scope.user.email_id,
                password: $scope.md5password
            }
            LoginService.signup(data)
            .then(function(user){
                if (user.message == "You've Successfully Signed up") {
                    $location.path('/login');
                }else{
                    
                $scope.signUpSuccess = true;
                $scope.passwordError = null;
                $scope.signUpMessage = user.message;
                };
                
            })
            .catch(function(err){

            });
        }else{
            $scope.passwordError = true;
            $scope.signUpSuccess = null;
            $scope.spasswordErrorMessage = "You have entered Incorrect Password or an invalid email address!";
        };


    }

    $scope.backToLogin = function(){
        $location.path('/login');
    }


  });
