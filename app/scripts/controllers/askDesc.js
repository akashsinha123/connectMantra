'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .controller('AskdescCtrl', function ($scope, $location, $cookieStore, EmployeeService, $rootScope, AskService, LanguageService) {

    $scope.que = AskService.ques;

    $scope.toggleEditQue = function(){
        $scope.showEditQue = !$scope.showEditQue;
    }

    $scope.answers = [];

    $scope.editor = ace.edit("editor");
    $scope.editor.setTheme("ace/theme/dawn");
    $scope.editor.getSession().setMode("ace/mode/javascript");
    $scope.editor.$blockScrolling = Infinity;
    $scope.editor.setValue("Place code here");

    $scope.codeVal =  $scope.editor.getValue();

    $scope.que2 =  $scope.que

    $scope.emplId = function(id){
      EmployeeService.userId = id;
    }

    $scope.date = new Date();
    $scope.date = $scope.date.toDateString();

    $scope.getRemainingLang = function(){
        
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            id: $scope.que.que_id,
            length: $scope.que.tag.length
        }

        AskService.getRemainingLang(data)
        .then(function(user){
          $scope.remainingTags = user.records;
        })
        .catch(function(err){
            
        });

    }

    $scope.getAnswers = function(){
        $scope.answerId = [];
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            que_id: $scope.que.que_id
        }
        AskService.getAnswers(data)
        .then(function(user){
          $scope.answers = user.records;
        angular.forEach($scope.answers, function(val){
            $scope.answerId.push(val.id);
        });
        })
        .catch(function(err){
            
        });
    }
    $scope.getAnswers();
    

    

    $scope.submitComment = function(comment,id){
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            comment : comment,
            answer_id: id,
            user_id: $cookieStore.get('userId'),
            user_name: $cookieStore.get('userName'),
            created : $scope.date
        }

        console.log(data);
        AskService.submitComment(data)
        .then(function(user){
        })
        .catch(function(err){
            
        });

        
    }



    $scope.submitAnswer = function(answer){

      var data = {
            sessionId : $cookieStore.get('sessionId'),
            answer : $scope.editor.getValue(),
            desc: $scope.ans.desc,
            que_id: $scope.que.que_id,
            user_id: $cookieStore.get('userId'),
            user_name: $cookieStore.get('userName'),
            created : $scope.date
        }
        console.log(data);

        AskService.submitAnswer(data)
        .then(function(user){
        })
        .catch(function(err){
            
        });

        $scope.answers.push(data);

        
    }

    $scope.editQues =  function(que){
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            question : que.question,
            id: $scope.que.que_id
        }

        AskService.editQues(data)
        .then(function(user){
            
        })
        .catch(function(err){
            
        });

        var langIdArray = [];
        angular.forEach(que.sourc, function(val){
            langIdArray.push(val.id);
            que.tag.push(val.name);
        });

        if (langIdArray.length) {
            var data3 = {
                sessionId : $cookieStore.get('sessionId'),
                id: langIdArray,
                que_id : $scope.que.que_id
            }

            AskService.addQuesTagRel2(data3)
            .then(function(user){

            })
            .catch(function(err){
                
            });
        };
        
    };


    setTimeout(function(){
        
      var data = {
            sessionId : $cookieStore.get('sessionId'),
            answ_id: $scope.answerId
        }
        AskService.getAnsComment(data)
        .then(function(user){
            angular.forEach($scope.answers, function(val){
                val.comments = [];
                angular.forEach(user.records, function(pal){
                    if (val.id == pal.answer_id) {
                        val.comments.push(pal);
                    };
                });
            });
            console.log($scope.answers);
        })
        .catch(function(err){
            
        });
    }, 130);
     

    
    
  });
























