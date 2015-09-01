'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .service('LanguageService', function ($http, $q) {

    this.langId = "";
    this.langName = "";
   this.getLang = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/languages.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.employeeLangInfo = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/empLangInfo.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.langSourceInfo = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/langSourceInfo.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   }

   this.addSource = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/addSource.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   }

   this.addSourceLangRel = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/addSourceLangRel.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   }


   this.DeleteSource = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/DeleteSource.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   }

   this.addLanguage = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/addLanguage.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   }

   this.deleteLanguage = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/deleteLanguage.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   }
   




  });
