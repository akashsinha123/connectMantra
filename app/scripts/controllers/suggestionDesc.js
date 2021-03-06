'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .controller('SuggestionDescCtrl', function ($scope, $location, $cookieStore, SuggestionService, EmployeeService) {

    $scope.sug = SuggestionService.sug;

    $scope.sug2 = $scope.sug;

    $scope.comments = [];

    $scope.emplId = function(id){
      EmployeeService.userId = id;
    }

    if ($scope.sug.id == $cookieStore.get('userId')) {
        $scope.personalProfile = true;
    };


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

    $scope.showEditSug = false;

    $scope.toggleEditSug = function(){
        $scope.showEditSug = !$scope.showEditSug;
    }

    $scope.editSug =  function(sug){

        var data = {
            sessionId : $cookieStore.get('sessionId'),
            name : sug.sug_name,
            description : sug.description,
            id: sug.sug_id
        }
        SuggestionService.editSug(data)
        .then(function(user){
            console.log(user);
            
        })
        .catch(function(err){
            
        });


        $scope.sug.sug_name = sug.sug_name;
        $scope.sug.description = sug.description;
      
        
    };


    $scope.date = new Date();
    $scope.date = $scope.date.toDateString();
    
    $scope.submitComment = function(comment){
        var UserNameA = "";
        var UserIdA = "";
        if (comment.anonymous) {
            UserNameA = "Anonymous";
            UserIdA = 67;
        }else{
            UserNameA = $cookieStore.get('userName')
            UserIdA = $cookieStore.get('userId');
        };
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            comment : comment.comment,
            sug_id: $scope.sug.sug_id,
            user_id: UserIdA,
            user_name: UserNameA,
            sug_created : $scope.date
        }

        SuggestionService.submitComment(data)
        .then(function(user){
            console.log(user);
        })
        .catch(function(err){
            
        });

        $scope.comments.push(data);
    }

    $scope.getComment = function(){
      var data = {
            sessionId : $cookieStore.get('sessionId'),
            sug_id: $scope.sug.sug_id
        }

        SuggestionService.getComment(data)
        .then(function(user){
            console.log(user);
          $scope.comments = user.records;
          angular.forEach($scope.comments, function(val){
                val.path = "";
                if (val.extension) {
                    val.path = '/api/images/' + val.id + '.' + val.extension;
                }else{
                    val.path = 'http://placehold.it/64x64';
                };

            });
            
        })
        .catch(function(err){
            
        });
    };

    $scope.getComment();

  });











