'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the chatpayApp
 */
 // getter of angularjs app here called chatpayApp
angular.module('chatpayApp')
  .filter('startFrommm', function(){
    return function(data, start, isEnable){
        if (isEnable) {
            return data.slice(start);
        }else{
            return data;
        }
        
    }
  })
  .controller('AskCtrl', function ($scope, $location, $cookieStore, EmployeeService, $rootScope, AskService, LanguageService) {

    $scope.pageSizeee = 10;
    $scope.currentPageee = 1;
    $scope.isEnableee = true;

    $scope.showUnAnswered = function(){
        $scope.unAnsweredCount = "showMePlease";
    };

    $scope.showAllQuestions = function(){
        $scope.unAnsweredCount = "0";
    };
    
    

    $scope.showAddQues = false;

    $scope.search = function() {
        $scope.isEnableee = false;
        $scope.pageSizeee = $scope.questions.length;
    };

    $scope.toggleAddQues = function(){
        $scope.showAddQues = !$scope.showAddQues;
    }

    $scope.getLang = function(){
        
        var data = {
            sessionId : $cookieStore.get('sessionId')
        }
        LanguageService.getLang(data)
        .then(function(user){
            $scope.languages = user.records;
        })
        .catch(function(err){
            
        });
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


    $scope.getQuestions = function(){
        var data = {
            sessionId : $cookieStore.get('sessionId'),
        }
        AskService.getQuestions(data)
        .then(function(user){
            $scope.questions = user[0].records;
            $scope.ques_lang_relation = user[1].records;
            $scope.countAns = user[2].records;

            angular.forEach($scope.questions, function(val){
                val.tag = [];
                val.count = 0;
                val.showUnAns = "showMePlease";
                angular.forEach($scope.ques_lang_relation, function(pal){
                    if (val.que_id == pal.ques_id) {
                        val.tag.push(pal.lang_name);
                     };
                });
                angular.forEach($scope.countAns, function(kal){
                    if (val.question == kal.question) {
                        val.count = kal.count;
                        val.showUnAns = "";
                     };
                });
            });
        })
        .catch(function(err){
            
        });
    }

    $scope.date = new Date();
    $scope.date = $scope.date.toDateString();

    $scope.addQues =  function(lang){


        var langIdArray = [];
        angular.forEach(lang.sourc, function(val){
            langIdArray.push(val.id);
        });

        var data = {
            sessionId : $cookieStore.get('sessionId'),
            question : lang.question,
            created : $scope.date
        }
        AskService.addQues(data)
        .then(function(user){
            var data4 = {
                sessionId : $cookieStore.get('sessionId')
            }

            AskService.getMaxQuesId(data4)
            .then(function(user){
                $scope.maxId = user;
                var data2 = {
                    sessionId : $cookieStore.get('sessionId'),
                    id: $cookieStore.get('userId'),
                    max_Id : $scope.maxId
                }
                console.log("data2",data2)
                AskService.addUserQuesRel(data2)
                .then(function(user){
                    console.log("UserQuesRel", user)
                })
                .catch(function(err){
                    
                });

                var data3 = {
                    sessionId : $cookieStore.get('sessionId'),
                    id: langIdArray,
                    max_Id : $scope.maxId
                }
                console.log("data3",data3)

                AskService.addQuesTagRel(data3)
                .then(function(user){
                    console.log("QuesTagRel", user)
                })
                .catch(function(err){
                    
                });
            
            })
            .catch(function(err){
                
            });


        })
        .catch(function(err){
            
        });

        

        lang.name = $cookieStore.get('userName');
        lang.ques_created = $scope.date;
        lang.tag = [];
        for (var i = 0; i < lang.sourc.length; i++) {
            lang.tag.push(lang.sourc[i].name);
        };

        $scope.questions.push(lang);
    };
    

    $scope.emplId = function(id){
      EmployeeService.userId = id;
    }

    $scope.queId = function(que){
        AskService.ques = que;
    }

    $scope.getQuestions();
    $scope.getLang();
  });
























