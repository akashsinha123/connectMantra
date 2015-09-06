'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .filter('startFrom', function(){
    return function(data, start, isEnable){
        if (isEnable) {
            return data.slice(start);
        }else{
            return data;
        }
        
    }
  })
  .controller('SuggestionCtrl', function ($scope, $location, $cookieStore, SuggestionService, EmployeeService) {
   
  $scope.pageSize = 5;
  $scope.currentPage = 1;
  $scope.isEnable = true;

  $scope.charactersLimit = 160;

  $scope.search = function() {
      $scope.isEnable = false;
      $scope.pageSize = $scope.suggestions.length;
  };

  $scope.date = new Date();
  $scope.date = $scope.date.toDateString();

  $scope.emplId = function(id){
     EmployeeService.userId = id;
  }

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

  $scope.getSuggestions = function(){
      var data = {
          sessionId : $cookieStore.get('sessionId'),
      }
      SuggestionService.getSuggestions(data)
      .then(function(user){
          $scope.suggestions = user.records;
      })
      .catch(function(err){
          
      });
  }
  

    $scope.addSug = function(sug){
      var UserNameA = "";
      var UserIdA = "";
      if (sug.anonymous) {
        UserNameA = "Anonymous";
        UserIdA = 67;
      }else{
        UserNameA = $cookieStore.get('userName')
        UserIdA = $cookieStore.get('userId');
      };
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            name : sug.sug_name,
            description : sug.description,
            created : $scope.date
        }
        SuggestionService.addSug(data)
        .then(function(user){
            console.log(user);
            
        })
        .catch(function(err){
            
        });
        var data2 = {
            sessionId : $cookieStore.get('sessionId'),
            id: UserIdA
        }

        SuggestionService.addUsersugRel(data2)
        .then(function(user){
          console.log(user);
            
        })
        .catch(function(err){
            
        });

        sug.name = UserNameA;
        sug.sug_created = $scope.date;
        $scope.suggestions.push(sug); 
    };
  

  $scope.showAddSug = false;

    $scope.toggleAddSug = function(){
        $scope.showAddSug = !$scope.showAddSug;
    }
  
  $scope.sugId = function(blog){
        SuggestionService.sug = blog;
    }

  $scope.getSuggestions();


  });
