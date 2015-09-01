'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .service('CustomerService', function ($http, $q) {
   
   this.fetch = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/home', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.profile = function(customerId){
    // var deferred = $q.defer();
    // $http.get('/api/profile')
    // .success(function(profile){
    //   deferred.resolve(profile);
    // })
    // .error(function(err){
    //   // deferred.reject(err);
    //   deferred.resolve({});
    // });

    // return deferred.promise;
   };

  });
