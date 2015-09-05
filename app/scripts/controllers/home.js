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
  .controller('HomeCtrl', function ($scope, $location, $cookieStore, EmployeeService, $rootScope) {

    $scope.pageSize = 6;
    $scope.currentPage = 1;
    $scope.isEnable = true;

    $scope.showAddEmp = false;
    $scope.showDeleteEmpl = false;

    // $scope.search = function() {
    //     if ($scope.employeeDir) {
    //         $scope.isEnable = false;
    //         $scope.pageSize = $scope.users.length;
    //     };
    //     $scope.isEnable = true;
    //     $scope.currentPage = 1;
    //     $scope.pageSize = 6;
        
    // }

    $scope.search = function() {
        $scope.isEnable = false;
        $scope.pageSize = $scope.users.length;
    };

    $scope.toggleAddEmpl = function(){
        $scope.showAddEmp = !$scope.showAddEmp;
    }

    $scope.toggleDeleteEmpl = function(){
        $scope.showDeleteEmpl = !$scope.showDeleteEmpl;
    }

    
    $scope.user = {
        employeeId : "",
        name : "",
        number : "",
        emergencyNumber : "",
        birthday : "",
        birthdayOrig : "",
        bloodGroup : "",
        presentAddress : "",
        permanentAddress : "",
        correspondenceAddress : "",
        employeeId : "",
        pan_no : "",
        F_H_name : ""
    }

    $scope.addEmployee = function(user){
        
        var Data = {
            employeeId : $scope.user.employeeId,
            name : $scope.user.name,
            number : $scope.user.number,
            emergencyNumber : $scope.user.emergencyNumber,
            birthday : $scope.user.birthday,
            birthdayOrig : $scope.user.birthdayOrig,
            bloodGroup : $scope.user.bloodGroup,
            gender : $scope.user.gender,
            presentAddress : $scope.user.presentAddress,
            permanentAddress : $scope.user.permanentAddress,
            correspondenceAddress : $scope.user.correspondenceAddress,
            pan_no : $scope.user.pan_no,
            F_H_name : $scope.user.F_H_name,
            city : user.city,
            email: user.email,
            zipCode: user.zipCode,
            sessionId : $cookieStore.get('sessionId')
        };

        console.log(Data);
        EmployeeService.addEmployee(Data)
        .then(function(user){
            console.log(user);
            if (user == "1 records UPDATED successfully" ) {$scope.showSuccessAddEmplMsg = true;};
            
        })
        .catch(function(err){
            
        });

        var user = {
            name : $scope.user.name,
            mobile : $scope.user.number,
            emergency_contact_no : $scope.user.emergencyNumber,
            city : $scope.user.city,
            email: $scope.user.email,
            zipCode: $scope.user.zipCode,
        }

        $scope.users.push(user);

    }

    $scope.DeleteEmpl = function(id, index){

        bootbox.confirm("Are you sure you want to delete this employee?", function(answer){
            if (answer == true) {
                $scope.isEnable = false;
                var data = {
                    sessionId : $cookieStore.get('sessionId'),
                    emplId : id
                }
                EmployeeService.deleteEmpl(data)
                .then(function(user){
                    console.log(user);
                    if (user == "1 records UPDATED successfully" ) {
                        $scope.showSuccessDeleteEmplMsg = true;
                        bootbox.alert("Employee Deleted");
                    }else{
                        bootbox.alert("Cannot delete the Emlpoyee due to RDBMS");
                    };
                })
                .catch(function(err){
                    
                });
                $scope.users.splice(index,1);
            };
            $scope.isEnable = true;
        })
    }

    

    $scope.getUsers = function(){
        
        var data = {
            sessionId : $cookieStore.get('sessionId')
        }

        EmployeeService.getUsers(data)
        .then(function(user){
            $scope.users = user[0].records;
            $scope.languages = user[1].records;
            $scope.projects = user[2].records;
            
            angular.forEach($scope.users, function(val){
                val.languages = [];
                val.projects = [];
                angular.forEach($scope.languages, function(pal){
                    if (val.id == pal.user_id) {
                        val.languages.push(pal);
                     };
                });
                angular.forEach($scope.projects, function(kal){
                    if (val.id == kal.user_id) {
                        val.projects.push(kal);
                     };
                });
            });
        })
        .catch(function(err){
            
        });
    }

    $scope.showDetail = function (u) {
        $scope.active = u.mobile;
    };



    $scope.userId = function(id){
        EmployeeService.user = id;
        var idd = id.id;
        $location.path('/employee/idd');
    }

    $scope.getUsers();

  });
