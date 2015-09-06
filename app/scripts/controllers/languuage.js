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
  .controller('LanguuageCtrl', function ($scope, $location, $cookieStore, LanguageService, EmployeeService) {


    $scope.pageSize = 6;
    $scope.currentPage = 1;
    $scope.isEnable = true;

    $scope.pageSizeee = 6;
    $scope.currentPageee = 1;
    $scope.isEnableee = true;


    $scope.langName = LanguageService.langName;
    $scope.langDesc = LanguageService.langDesc;

    

    $scope.employeeLangInfo = function(){
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            id: LanguageService.langId
        }
        LanguageService.employeeLangInfo(data)
        .then(function(user){
            $scope.employeeInfo = user.records;
        })
        .catch(function(err){
            
        });
    }


    $scope.langSourceInfo = function(){
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            id: LanguageService.langId
        }
        LanguageService.langSourceInfo(data)
        .then(function(user){
            $scope.sourceInfo = user.records;
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

    $scope.userId = function(id){
        EmployeeService.userId = id;
    }

    $scope.showAddSource = false;
    $scope.showAddlang = false;
    $scope.showDeleteSource = false;


    $scope.toggleAddSource = function(){
        $scope.showAddSource = !$scope.showAddSource;
    }

    $scope.toggleDeleteSource = function(){
        $scope.showDeleteSource = !$scope.showDeleteSource;
    }

    $scope.addSource = function(source){

        var data = {
            sessionId : $cookieStore.get('sessionId'),
            name : source.name,
            address : source.address
        }

        LanguageService.addSource(data)
        .then(function(user){
            if (user == "1 records UPDATED successfully" ) {$scope.showSuccessAddSourceMsg = true;};
            
        })
        .catch(function(err){
            
        });

        var data2 = {
            sessionId : $cookieStore.get('sessionId'),
            langId : LanguageService.langId
        }

        LanguageService.addSourceLangRel(data2)
        .then(function(user){
            
        })
        .catch(function(err){
            
        });

        var sx = {
            name : source.name,
            address: source.address
        }

        $scope.sourceInfo.push(sx);

        source.name = "";
        source.address = "";

    };

    $scope.DeleteSource = function(id, index){
        var ind = index + (($scope.currentPageee - 1)*$scope.pageSizeee);
        bootbox.confirm("Are you sure you want to delete this Reference?", function(answer){
            if (answer == true) {
                $scope.isEnableee = false;
                var data = {
                    sessionId : $cookieStore.get('sessionId'),
                    langId : LanguageService.langId,
                    source_id : id
                }
                LanguageService.DeleteSource(data)
                .then(function(user){
                    if (user == "1 records UPDATED successfully" ) {
                        $scope.showSuccessDeleteSourceMsg = true;
                        bootbox.alert("Reference Deleted");
                        $scope.sourceInfo.splice(ind,1);
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
        




    $scope.langSourceInfo();
    $scope.employeeLangInfo();

  });
