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
  .controller('EmployeessCtrl', function ($scope, $location, $cookieStore, EmployeeService) {

    $scope.allLang = [];
    $scope.letterLimit = 180;

    $scope.pageSize = 6;
    $scope.currentPage = 1;
    $scope.isEnable = true;

    $scope.pageSizeee = 6;
    $scope.currentPageee = 1;
    $scope.isEnableee = true;

    $scope.UserEmpId = EmployeeService.userId;
    console.log("empId", EmployeeService.userId)

    //$scope.lang = "";
    $scope.getUserInfo = function(){


        var data = {
            sessionId : $cookieStore.get('sessionId'),
            id: $scope.UserEmpId
        }
        EmployeeService.getUserInfo(data)
        .then(function(user){
            $scope.userInfo = user.records[0];
            if ($scope.userInfo.extension) {
                $scope.path = '/api/images/' + $scope.userInfo.id + '.' + $scope.userInfo.extension;
                
            }else{
                $scope.path = '../../images/-1.png'
            };

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

    $scope.getUserLang = function(){
        
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            id: $scope.UserEmpId
        }
        console.log("lang",data);
        EmployeeService.getUserLang(data)
        .then(function(user){
            $scope.languages = user.records;
            if ($scope.languages.length > 1) {
                $scope.length = 1;
            }else{
                $scope.length = 0;
            };
        })
        .catch(function(err){
            
        });
    }

    $scope.getUserProject = function(){
        
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            id: $scope.UserEmpId
        }
        console.log("projects",data);
        EmployeeService.getUserProjects(data)
        .then(function(user){
            $scope.projects = user.records;
            if ($scope.projects.length > 1) {
                $scope.projectlength = 1;
            }else{
                $scope.projectlength = 0;
            };
        })
        .catch(function(err){
            
        });
    }




    $scope.getAllLang = function(){
        
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            id: $scope.UserEmpId,
            length: $scope.length
        }
        EmployeeService.getAllLang(data)
        .then(function(user){
            $scope.allLanguages = user.records;
        })
        .catch(function(err){
            
        });
    }

    $scope.getUserBlog = function(){
        
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            id: $scope.UserEmpId
        }
        EmployeeService.getUserBlog(data)
        .then(function(user){
            $scope.blogs = user.records;
        })
        .catch(function(err){
            
        });
    }





    $scope.showAddModal = false;
    $scope.showAddlang = false;
    $scope.showDeletelang = false;
    $scope.showAddProject = false;
    $scope.showDeleteProj = false;
    $scope.showAddBlog = false;
    $scope.showEditBlog = false;             
    $scope.showDeleteBlog = false;               

    $scope.user = {
        name : "",
        number : "",
        emergencyNumber : "",
        birthday : "",
        bloodGroup : "",
        presentAddress : "",
        permanentAddress : ""
    };

    $scope.toggleAddEmployee = function(name, number, emergencyNumber, birthday, bloodGroup, presentAddress, permanentAddress){
        $scope.showAddModal = !$scope.showAddModal;
        $scope.user.name = name;
        $scope.user.number = number;
        $scope.user.emergencyNumber = emergencyNumber;
        $scope.user.birthday = birthday;
        $scope.user.bloodGroup = bloodGroup;
        $scope.user.presentAddress = presentAddress;
        $scope.user.permanentAddress = permanentAddress;
    };

    $scope.Update = function(){

        $scope.updatedData = {
            name : $scope.user.name,
            number : $scope.user.number,
            emergencyNumber : $scope.user.emergencyNumber,
            birthday : $scope.user.birthday,
            bloodGroup : $scope.user.bloodGroup,
            presentAddress : $scope.user.presentAddress,
            permanentAddress : $scope.user.permanentAddress,
            sessionId : $cookieStore.get('sessionId'),
            id: $scope.UserEmpId
        };


        EmployeeService.updateUser($scope.updatedData)
        .then(function(user){
            if (user == "1 records UPDATED successfully" ) {$scope.showSuccessUpdateMsg = true;};
        })
        .catch(function(err){
            
        });
        $scope.showAddModal = !$scope.showAddModal;
    }

    // $scope.selected = function(nowSelected){
   
    //    $scope.selectedValues = [];
    //    if( ! nowSelected ){
    //     return;
    //     }
    //     angular.forEach(nowSelected, function(val){
    //            $scope.selectedValues.push(val);
    //        });
    // };

    $scope.addLang =  function(lang){
        $scope.selectedValues = [];
        var pal = {};
        angular.forEach(lang, function(val){
            $scope.selectedValues.push(val.id);
            pal = {
                id: val.id,
                lang_name : val.name
            }
            $scope.languages.push(pal);
        });
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            id: $scope.UserEmpId,
            langId : $scope.selectedValues
        }
        EmployeeService.addEmpLang(data)
        .then(function(user){
            $scope.langAddedMsg = user;
            if ($scope.langAddedMsg == "1 records UPDATED successfully" ) {
                $scope.showSuccessAddLangMsg = true;
            };
            
        })
        .catch(function(err){
            
        });
    };

    $scope.addProj =  function(lang){
        $scope.selectedProjects = [];
        var kal = {};
        angular.forEach(lang, function(val){
            $scope.selectedProjects.push(val.id);
            kal = {
                id: val.id,
                project_name : val.name
            }
            $scope.projects.push(kal);
        });
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            id: $scope.UserEmpId,
            projId : $scope.selectedProjects
        }
        EmployeeService.addEmpProj(data)
        .then(function(user){
            $scope.projAddedMsg = user;
            if ($scope.projAddedMsg == "1 records UPDATED successfully" ) {$scope.showSuccessAddProjMsg = true;};
            
        })
        .catch(function(err){
            
        });
    };





    $scope.addBlog =  function(blog){

        var data = {
            sessionId : $cookieStore.get('sessionId'),
            name : blog.name,
            description : blog.description
        }

        EmployeeService.addBlog(data)
        .then(function(user){
            $scope.blogAddedMsg = user;
            if ($scope.blogAddedMsg == "1 records UPDATED successfully" ) {$scope.showSuccessAddBlogMsg = true;};
            
        })
        .catch(function(err){
            
        });



        var data2 = {
            sessionId : $cookieStore.get('sessionId'),
            id: $scope.UserEmpId
        }

        EmployeeService.addUserBlogRel(data2)
        .then(function(user){

            
            
        })
        .catch(function(err){
            
        });
      
        
    };


    $scope.blog3 = {
        name : "",
        description : "",
        id : ""
    };

    $scope.editBlog = function(name, description,index){
        $scope.selectedBlog = $scope.blogs[index];
        $scope.blogs[index].name = name;
        $scope.blogs[index].description = description;

    };

    // $scope.editBlogDatabase = function(blog){

    //     var data = {
    //         sessionId : $cookieStore.get('sessionId'),
    //         id: blog.id,
    //         name : blog.name,
    //         description : blog.description
    //     }
    //     EmployeeService.editBlogDatabase(data)
    //     .then(function(user){
    //         if (user == "1 records UPDATED successfully" ) {$scope.showSuccessEditBlogMsg = true;};
    //     })
    //     .catch(function(err){
            
    //     });
    // }



    
    



    $scope.DeleteLang = function(id, index){
        var indd = index + (($scope.currentPage - 1)*$scope.pageSize);
        bootbox.confirm("Are you sure you want to delete this Language?", function(answer){
            if (answer == true) {
                $scope.isEnable = false;
                var data = {
                    sessionId : $cookieStore.get('sessionId'),
                    id: $scope.UserEmpId,
                    langId : id
                }
                EmployeeService.deleteEmpLang(data)
                .then(function(user){
                    if (user == "1 records UPDATED successfully" ) {
                        $scope.showSuccessDeleteLangMsg = true;
                        bootbox.alert("Language Deleted");
                        $scope.languages.splice(indd,1);
                    }else{
                        bootbox.alert("Cannot delete Language due to RDBMS");
                    };
                })
                .catch(function(err){
                    
                });
            };
            $scope.isEnable = true;
        })
    }


    $scope.DeleteProj = function(id, index){
        var ind = index + (($scope.currentPageee - 1)*$scope.pageSizeee);
        bootbox.confirm("Are you sure you want to delete this Project?", function(answer){
            if (answer == true) {
                $scope.isEnableee = false;
                var data = {
                    sessionId : $cookieStore.get('sessionId'),
                    id: $scope.UserEmpId,
                    projId : id
                }
                
                EmployeeService.deleteEmpProj(data)
                .then(function(user){
                    
                    if (user == "1 records UPDATED successfully" ) {
                        $scope.showSuccessDeleteProjMsg = true;
                        bootbox.alert("Project Deleted");
                        $scope.projects.splice(ind,1);
                    }else{
                        bootbox.alert("Cannot delete Project due to RDBMS");
                    };
                })
                .catch(function(err){
                    
                });
            };
            $scope.isEnableee = true;
        })
        
        
    }


    $scope.getAllProject = function(){
        
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            id: $scope.UserEmpId,
            length: $scope.projectlength
        }
        EmployeeService.getAllProjects(data)
        .then(function(user){
            $scope.allProjects = user.records;
        })
        .catch(function(err){
            
        });
    }




    $scope.toggleAddlang = function(){
        $scope.showAddlang = !$scope.showAddlang;
    }





    $scope.toggleDeletelang = function(){
        $scope.showDeletelang = !$scope.showDeletelang;
    }


    $scope.toggleAddProject = function(){
        $scope.showAddProject = !$scope.showAddProject;
    }


    $scope.toggleDeleteProj = function(){
        $scope.showDeleteProj = !$scope.showDeleteProj;
    }
    
    $scope.toggleAddBlog = function(){
        $scope.showAddBlog = !$scope.showAddBlog;
    }

    $scope.toggleEditBlog = function(event){
        $(event.target).siblings();
        console.log($(event.target).siblings());
        $scope.showEditBlog = !$scope.showEditBlog;
    }

    $scope.toggleDeleteBlog = function(){
        $scope.showDeleteBlog = !$scope.showDeleteBlog;
    }




    

    $scope.getUserLang();
    $scope.getUserInfo();
    $scope.getUserProject();
    $scope.getUserBlog();

  });
