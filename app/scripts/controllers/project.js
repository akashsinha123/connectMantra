'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the chatpayApp
 */
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
  .controller('ProjectCtrl', function ($scope, $location, $cookieStore, ProjectService) {
    
    $scope.pageSizeee = 10;
    $scope.currentPageee = 1;
    $scope.isEnableee = true;

    $scope.charactersLimit = 30;

    $scope.getProjects = function(){
        
        var data = {
            sessionId : $cookieStore.get('sessionId')
        }
        ProjectService.getProjects(data)
        .then(function(user){
            $scope.projects = user.records;
        })
        .catch(function(err){
            
        });
    }

    $scope.projectId = function(id, name){
        ProjectService.projectId = id;
        ProjectService.projectName = name;
        var idd = id
        $location.path('/project/idd');
    }


    $scope.showAddProj = false;

    $scope.toggleAddProj = function(){
        $scope.showAddProj = !$scope.showAddProj;
    }

    $scope.addProject = function(proje){
        var Data = {
            name : proje.name,
            desc : proje.desc,
            sessionId : $cookieStore.get('sessionId')
        };
        console.log(Data);
        ProjectService.addProject(Data)
        .then(function(user){
            console.log(user);
            if (user == "1 records UPDATED successfully" ) {
            };
        })
        .catch(function(err){
            
        });

        var pan = {
            name : proje.name,
            desc : proje.desc,
        }

        $scope.projects.push(pan);

    }

    $scope.DeleteProj = function(id, index){
        var ind = index + (($scope.currentPageee - 1)*$scope.pageSizeee);
        bootbox.confirm("Are you sure you want to delete this Project?", function(answer){
            if (answer == true) {
                $scope.isEnableee = false;
                var Data = {
                    id : id,
                    sessionId : $cookieStore.get('sessionId')
                };
    
                ProjectService.deleteProject(Data)
                .then(function(user){
                    console.log(user);
                    if (user == "1 records UPDATED successfully" ) {
                        bootbox.alert("Project Deleted");
                        $scope.projects.splice(ind, 1);
                    }else{
                        bootbox.alert("Cannot Delete Project Due to RDBMS");
                    };
                })
                .catch(function(err){
                    
                });
            };
            $scope.isEnableee = true;
        })
    }


    
     $scope.getProjects();

  });
