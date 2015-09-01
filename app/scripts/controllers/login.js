'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .controller('LoginCtrl', function ($scope, $location, $cookieStore, LoginService, md5) {
    
    $scope.login = function(){
        $scope.md5password = md5.createHash($scope.user.password || '');
        $scope.md5username = md5.createHash($scope.user.username || '');
        
        var data = {
            username: $scope.user.username,
            password: $scope.md5password
        }
        LoginService.login(data)
        .then(function(user){
            if (user.records) {
                console.log(user.records);
                $location.path('/home');
            }else{
                $scope.loginFailed = true;
                $scope.loginMessage = "Your username or password is incorrect";
                $location.path('/login');
            };
            $cookieStore.put('sessionId', user.records[0].sessionId);
            $cookieStore.put('userId', user.records[0].id);
            $cookieStore.put('userName', user.records[0].name);
            console.log(user.records[0].id);
        })
        .catch(function(err){
            
        });
    }

    $scope.signUp = function(){
        $location.path('/signup');
        // $scope.md5password = md5.createHash($scope.user.password || '');
        // $scope.md5username = md5.createHash($scope.user.username || '');
        
        // var data = {
        //     username: $scope.user.username,
        //     password: $scope.md5password
        // }
        // LoginService.signup(data)
        // .then(function(user){
        //     $scope.signUpSuccess = true;
        //     $scope.signUpMessage = user;
        //     $location.path('/login');
        // })
        // .catch(function(err){

        // });
    }


  });
