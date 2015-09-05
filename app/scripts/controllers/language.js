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
  .controller('LanguageCtrl', function ($scope, $location, $cookieStore, LanguageService) {

    $scope.pageSizeee = 10;
    $scope.currentPageee = 1;
    $scope.isEnableee = true;
    
    $scope.charactersLimit = 30;

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


    $scope.showAddlang = false;

    $scope.toggleAddLang = function(){
        $scope.showAddlang = !$scope.showAddlang;
    }


    $scope.langId = function(id, name, desc, index){
        LanguageService.langId = id;
        LanguageService.langName = name;
        LanguageService.langDesc = desc;
        var idd = id
        $location.path('/language/idd');
    }


    $scope.addLanguage = function(lang){
        
        var Data = {
            name : lang.name,
            desc : lang.desc,
            sessionId : $cookieStore.get('sessionId')
        };
        LanguageService.addLanguage(Data)
        .then(function(user){
            if (user == "1 records UPDATED successfully" ) { $scope.showSuccessAddLangMsg = true;};
        })
        .catch(function(err){
            
        });

        var lan = {
            name : lang.name,
            desc : lang.desc,
        }

        $scope.languages.push(lan);

    }

    $scope.DeleteLang = function(id, index){
        var ind = index + (($scope.currentPageee - 1)*$scope.pageSizeee);
        bootbox.confirm("Are you sure you want to delete this Language?", function(answer){
            if (answer == true) {
                $scope.isEnableee = false;
                var Data = {
                    id : id,
                    sessionId : $cookieStore.get('sessionId')
                };
    
                LanguageService.deleteLanguage(Data)
                .then(function(user){
                    if (user == "1 records UPDATED successfully" ) {
                        bootbox.alert("Language Deleted");
                        $scope.languages.splice(ind, 1);
                    }else{
                        bootbox.alert("Cannot delete language due to RDBMS");
                    };
                })
                .catch(function(err){
                    
                });
            };
            $scope.isEnableee = true;
        })
    }



     $scope.getLang();

  });
