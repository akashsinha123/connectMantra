'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .service('EmployeeService', function ($http, $q) {


    this.userId = "";
   
   this.getUsers = function(data){



    var getUsers = $q.defer();
    
    $http.post('/api/employees.php', $.param(data))
    .success(function(info){
      getUsers.resolve(info);
    })
    .error(function(err){
      getUsers.reject(err);
    });

    var getUsersLang = $q.defer();
    
    $http.post('/api/employeeLang.php', $.param(data))
    .success(function(info){
      getUsersLang.resolve(info);
    })
    .error(function(err){
      getUsersLang.reject(err);
    });

    var getUsersProject = $q.defer();
    
    $http.post('/api/employeeProject.php', $.param(data))
    .success(function(info){
      getUsersProject.resolve(info);
    })
    .error(function(err){
      getUsersProject.reject(err);
    });


    getUsers.promise.then(function(res){
      //console.log(res);
    });

    getUsersLang.promise.then(function(res){
      //console.log(res);
    });

    getUsersProject.promise.then(function(res){
      //console.log(res);
    });


    var bothPromise = $q.all([getUsers.promise, getUsersLang.promise, getUsersProject.promise]);

    bothPromise.then(function(results){
      //console.log(results);
      

    }, function(){

    });


    return bothPromise;






   };


















   this.count = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/count.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.getUserInfo = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/employeeInfo.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.getAllLang = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/allLang.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };


   this.getAllProjects = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/allProjects.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   


   this.getUserLang = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/employeeLang.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.getUserProject = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/employeeProject.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.getUserBlog = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/employeeBlog.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.getBlogs = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/allBlog.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.updateUser = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/updateEmployee.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };


   this.addEmpLang = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/addEmpLang.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.addEmpProj = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/addEmpProj.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   


  this.deleteEmpLang = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/deleteEmpLang.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };


   this.deleteEmpProj = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/deleteEmpProj.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };


   this.addBlog = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/addBlog.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };


   this.addUserBlogRel = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/addUserBlogRel.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };
   
   

   // this.editBlogDatabase = function(data){
   //  var deferred = $q.defer();
    
   //  $http.post('/api/editBlogDatabase.php', $.param(data))
   //  .success(function(info){
   //    deferred.resolve(info);
   //  })
   //  .error(function(err){
   //    deferred.reject(err);
   //  });

   //  return deferred.promise;
   // };


   this.addEmployee = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/addEmployee.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };
   

   this.deleteEmpl = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/deleteEmpl.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };
   

  });




















