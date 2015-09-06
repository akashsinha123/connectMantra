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
  .filter('startFrommm', function(){
    return function(data, start, isEnable){
        if (isEnable) {
            return data.slice(start);
        }else{
            return data;
        }
        
    }
  })
  .controller('ProjectInfoCtrl', function ($scope, $location, $cookieStore, ProjectService, EmployeeService, LanguageService) {
    
    $scope.pageSize = 6;
    $scope.currentPage = 1;
    $scope.isEnable = true;

    $scope.pageSizeee = 6;
    $scope.currentPageee = 1;
    $scope.isEnableee = true;

    $scope.projectName = ProjectService.projectName;

    $scope.getProjectDesc = function(){
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            id: ProjectService.projectId
        }
        ProjectService.getProjectDesc(data)
        .then(function(user){
            $scope.projectDesc = user.records[0];
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

    $scope.getEmployees = function(){
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            id: ProjectService.projectId
        }
        ProjectService.getEmployees(data)
        .then(function(user){
            $scope.projectEmployees = user.records;
        })
        .catch(function(err){
            
        });
    }


    $scope.getLanuages = function(){
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            id: ProjectService.projectId
        }
        ProjectService.getLanuages(data)
        .then(function(user){
            $scope.projectLang = user.records;
            if ($scope.projectLang.length > 1) {
                $scope.languagelength = 1;
            }else{
                $scope.languagelength = 0;
            };
        })
        .catch(function(err){
            
        });
    }


    $scope.showAddProject = false;
    $scope.showDeleteLang = false;
    


    $scope.toggleAddProject = function(){
        $scope.showAddProject = !$scope.showAddProject;
    }

    $scope.toggleDeleteLang = function(){
        $scope.showDeleteLang = !$scope.showDeleteLang;
    }


    $scope.getAllProjectLang = function(){
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            id: ProjectService.projectId,
            length : $scope.languagelength
        }
        ProjectService.getAllProjectLang(data)
        .then(function(user){
            $scope.remainingLang = user.records;
        })
        .catch(function(err){
            
        });
    }

    $scope.addLanguage = function(remLang){
        var langIdArray = [];
        angular.forEach(remLang, function(val){
            langIdArray.push(val.id);
            $scope.projectLang.push(val);
        });
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            id: ProjectService.projectId,
            lang_id : langIdArray
        }
        ProjectService.addProjectLang(data)
        .then(function(user){
            $scope.remainingLang = user.records;
            if (user == "1 records UPDATED successfully" ) {$scope.showSuccessAddLangMsg = true;};
        })
        .catch(function(err){
            
        });
        
    }

    $scope.deleteLang = function(id, index){
        
        

        var ind = index + (($scope.currentPageee - 1)*$scope.pageSizeee);
        bootbox.confirm("Are you sure you want to delete this Language?", function(answer){
            if (answer == true) {
                $scope.isEnableee = false;
                var data = {
                    sessionId : $cookieStore.get('sessionId'),
                    id: ProjectService.projectId,
                    lang_id : id
                }
                ProjectService.DeleteLang(data)
                .then(function(user){
                    $scope.remainingLang = user.records;
                    if (user == "1 records UPDATED successfully" ) {
                        $scope.showSuccessDeletePLangMsg = true;
                        bootbox.alert("Language Deleted");
                        $scope.projectLang.splice(ind,1);
                    };
                })
                .catch(function(err){
                    
                });
            };
            $scope.isEnableee = true;
        })
    };



    $scope.userId = function(id){
        EmployeeService.userId = id;
    }

    $scope.langId = function(id, name, desc){
        LanguageService.langId = id;
        LanguageService.langName = name;
        LanguageService.langDesc = desc;
    }



    $scope.getLanuages();
    $scope.getProjectDesc();
    $scope.getEmployees();

  });
