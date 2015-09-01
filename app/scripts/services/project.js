'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .service('ProjectService', function ($http, $q) {

    this.projectId = "";
    this.projectName = "";
   this.getProjects = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/projects.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.getProjectDesc = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/projectInfo.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.getEmployees = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/projEmployees.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.getLanuages = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/projectLangInfo.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   }

   this.getAllProjectLang = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/getAllProjectLang.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   }

   this.addProjectLang = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/addProjectLang.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   }

   this.DeleteLang = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/DeleteLang.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   }

   this.addProject = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/addProject.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   }

   this.deleteProject = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/deleteProject.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   }
   
   
   

  });
