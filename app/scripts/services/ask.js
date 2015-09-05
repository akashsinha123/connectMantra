'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .service('AskService', function ($http, $q) {

    this.lang = "";

    this.ques = "";
   
   this.getQuestions = function(data){
    var questions = $q.defer();
    
    $http.post('/api/getQuestions.php', $.param(data))
    .success(function(info){
      questions.resolve(info);
    })
    .error(function(err){
      questions.reject(err);
    });

    var relation = $q.defer();
    
    $http.post('/api/getRelations.php', $.param(data))
    .success(function(info){
      relation.resolve(info);
    })
    .error(function(err){
      relation.reject(err);
    });

    var countAns = $q.defer();
    
    $http.post('/api/countAns.php', $.param(data))
    .success(function(info){
      countAns.resolve(info);
    })
    .error(function(err){
      countAns.reject(err);
    });

    questions.promise.then(function(res){
      //console.log(res);
    });

    relation.promise.then(function(res){
      //console.log(res);
    });

    countAns.promise.then(function(res){
      //console.log(res);
    });

    var bothPromise = $q.all([questions.promise, relation.promise, countAns.promise]);

    bothPromise.then(function(results){
      //console.log(results);
      

    }, function(){

    });
    
    return bothPromise;

   };


   this.addQues = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/addQues.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.addUserQuesRel = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/addUserQuesRel.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.addQuesTagRel = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/addQuesTagRel.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.addQuesTagRel2 = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/addQuesTagRel2.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   

   this.getRemainingLang = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/getRemainingLang.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   
   this.editQues = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/editQues.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.submitAnswer = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/submitAnswer.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.getAnswers = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/getAnswers.php', $.param(data))
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
    
    $http.post('/api/submitAnsComment.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.getAnsComment = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/getAnsComment.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };

   this.getMaxQuesId = function(data){
    var deferred = $q.defer();
    
    $http.post('/api/getMaxQuesId.php', $.param(data))
    .success(function(info){
      deferred.resolve(info);
    })
    .error(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
   };
   

   
   

  });




















