'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .service('BlogService', function ($http, $q) {

	this.blog = "";

	
	this.editBlog = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/editBlogDatabase.php', $.param(data))
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
    
    $http.post('/api/submitComment.php', $.param(data))
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
    
    $http.post('/api/getComment.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };
	
  });
