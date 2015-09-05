'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .service('SuggestionService', function ($http, $q) {

    this.sug = "";
   
   this.getSuggestions = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/suggestions.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.editSug = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/editSug.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.addSug = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/addSug.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.addUsersugRel = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/addUsersugRel.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.getComment = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/getSugComment.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.submitComment = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/submitSugComment.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };


   

  });






















