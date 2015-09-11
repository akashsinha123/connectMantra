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
  .controller('EmployeeCtrl', function ($scope, $location, $cookieStore, EmployeeService) {
    

    $scope.allLang = [];
    $scope.letterLimit = 180;

    $scope.pageSize = 6;
    $scope.currentPage = 1;
    $scope.isEnable = true;

    $scope.pageSizeee = 6;
    $scope.currentPageee = 1;
    $scope.isEnableee = true;

    $scope.profilePic = "";

    $scope.userrr = EmployeeService.user;
    console.log($scope.userrr);

    if ($scope.userrr.extension) {
        $scope.path = '/api/images/' + $scope.userrr.id + '.' + $scope.userrr.extension;
        
    }else{
        $scope.path = '../../images/-1.png';
    };

    if ($scope.userrr.id == $cookieStore.get('userId')) {
        $scope.personalProfile = true;
    };

    if ($scope.userrr.languages.length > 1) {
        $scope.length = 1;
    }else{
        $scope.length = 0;
    };

    if ($scope.userrr.projects.length > 1) {
        $scope.projectlength = 1;
    }else{
        $scope.projectlength = 0;
    };

    $scope.user = $scope.userrr;

     $scope.showImage = function(image){
        if (image) {
            var data = {
                sessionId : $cookieStore.get('sessionId'),
                dataURL: image.dataURL,
                extention : image.file.name,
                userId : $scope.userrr.id
            }
            EmployeeService.uploadImage(data)
            .then(function(user){
              $scope.path = '/api/' + user;
              $scope.showImageMsg = true;
              console.log(user);
            })
            .catch(function(err){
                
            });
        };
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

    // $scope.SubmitProfilePic = function(){
    //     console.log($scope.profilePic);
    // }

    //$scope.lang = "";
    // $scope.getUserInfo = function(){


    //     // var data = {
    //     //     sessionId : $cookieStore.get('sessionId'),
    //     //     id: $scope.userrr.id
    //     // }
    //     // EmployeeService.getUserInfo(data)
    //     // .then(function(user){
    //     //     $scope.userInfo = user.records[0];
    //     // })
    //     // .catch(function(err){
            
    //     // });
    // }

    // $scope.getUserInfo = function(){
        
    //     var data = {
    //         sessionId : $cookieStore.get('sessionId'),
    //         id: $scope.userrr.id
    //     }
    //     EmployeeService.getUserLang(data)
    //     .then(function(user){
    //         $scope.languages = user.records;
            
    //     })
    //     .catch(function(err){
            
    //     });
    // }

    // $scope.getUserProject = function(){
        
    //     var data = {
    //         sessionId : $cookieStore.get('sessionId'),
    //         id: $scope.userrr.id
    //     }
    //     EmployeeService.getUserProject(data)
    //     .then(function(user){
    //         $scope.projects = user.records;
    //         if ($scope.userrr.projects.length > 1) {
    //             $scope.projectlength = 1;
    //         }else{
    //             $scope.projectlength = 0;
    //         };
    //     })
    //     .catch(function(err){
            
    //     });
    // }




    $scope.getAllLang = function(){
        
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            id: $scope.userrr.id,
            length: $scope.length
        }
        EmployeeService.getAllLang(data)
        .then(function(user){
            $scope.allLanguages = user.records;
        })
        .catch(function(err){
            
        });
    }

    // $scope.getUserBlog = function(){
        
    //     // var data = {
    //     //     sessionId : $cookieStore.get('sessionId'),
    //     //     id: $scope.userrr.id
    //     // }
    //     // EmployeeService.getUserBlog(data)
    //     // .then(function(user){
    //     //     $scope.blogs = user.records;
    //     // })
    //     // .catch(function(err){
            
    //     // });
    // }





    $scope.showAddModal = false;
    $scope.showAddlang = false;
    $scope.showDeletelang = false;
    $scope.showAddProject = false;
    $scope.showDeleteProj = false;
    $scope.showAddBlog = false;
    $scope.showEditBlog = false;             
    $scope.showDeleteBlog = false;

    $scope.toggleAddEmployee = function(name, number, emergencyNumber, birthday, bloodGroup, presentAddress, permanentAddress){
        $scope.showAddModal = !$scope.showAddModal;
        // $scope.user.name = name;
        // $scope.user.number = number;
        // $scope.user.emergencyNumber = emergencyNumber;
        // $scope.user.birthday = birthday;
        // $scope.user.bloodGroup = bloodGroup;
        // $scope.user.presentAddress = presentAddress;
        // $scope.user.permanentAddress = permanentAddress;
    };

    $scope.Update = function(user){


        $scope.updatedData = {
            name : user.name,
            number : user.mobile,
            emergencyNumber : user.emergency_contact_no,
            birthday : user.dob,
            bloodGroup : user.blood_group,
            presentAddress : user.address,
            designation : user.designation,
            permanentAddress : user.permanent_address,
            sessionId : $cookieStore.get('sessionId'),
            id: $scope.userrr.id
        };


        EmployeeService.updateUser($scope.updatedData)
        .then(function(user){
            
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
            $scope.userrr.languages.push(pal);
        });
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            id: $scope.userrr.id,
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
            $scope.userrr.projects.push(kal);
        });
        var data = {
            sessionId : $cookieStore.get('sessionId'),
            id: $scope.userrr.id,
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





    // $scope.addBlog =  function(blog){

    //     var data = {
    //         sessionId : $cookieStore.get('sessionId'),
    //         name : blog.name,
    //         description : blog.description
    //     }

    //     EmployeeService.addBlog(data)
    //     .then(function(user){
    //         $scope.blogAddedMsg = user;
    //         if ($scope.blogAddedMsg == "1 records UPDATED successfully" ) {$scope.showSuccessAddBlogMsg = true;};
            
    //     })
    //     .catch(function(err){
            
    //     });



    //     var data2 = {
    //         sessionId : $cookieStore.get('sessionId'),
    //         id: $scope.userrr.id
    //     }

    //     EmployeeService.addUserBlogRel(data2)
    //     .then(function(user){

            
            
    //     })
    //     .catch(function(err){
            
    //     });
      
        
    // };


    // $scope.blog3 = {
    //     name : "",
    //     description : "",
    //     id : ""
    // };

    // $scope.editBlog = function(name, description,index){
    //     $scope.selectedBlog = $scope.blogs[index];
    //     $scope.blogs[index].name = name;
    //     $scope.blogs[index].description = description;

    // };

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
                    id: $scope.userrr.id,
                    langId : id
                }

                EmployeeService.deleteEmpLang(data)
                .then(function(user){
                    if (user == "1 records UPDATED successfully" ) {
                        $scope.showSuccessDeleteLangMsg = true;
                        bootbox.alert("Language Deleted");
                        $scope.userrr.languages.splice(indd,1);
                    }else{
                        bootbox.alert("Some error Occured");
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
                    id: $scope.userrr.id,
                    projId : id
                }
                
                EmployeeService.deleteEmpProj(data)
                .then(function(user){
                    
                    if (user == "1 records UPDATED successfully" ) {
                        $scope.showSuccessDeleteProjMsg = true;
                        bootbox.alert("Project Deleted");
                        $scope.userrr.projects.splice(ind,1);
                    }else{
                        bootbox.alert("Some error Occured");
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
            id: $scope.userrr.id,
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
    



  });
