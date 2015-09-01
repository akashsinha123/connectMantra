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
  .controller('BlogsCtrl', function ($scope, $location, $cookieStore, EmployeeService, BlogService) {

    $scope.pageSize = 3;
    $scope.currentPage = 1;
    $scope.isEnable = true;

    $scope.charactersLimit = 210;

    $scope.search = function() {
        $scope.isEnable = false;
        $scope.pageSize = $scope.blogs.length;
    };

    $scope.showAddBlog = false;

    $scope.toggleAddBlog = function(){
        $scope.showAddBlog = !$scope.showAddBlog;
    }


    $scope.date = new Date();
    $scope.date = $scope.date.toDateString();


    $scope.addBlog =  function(blog){

        var data = {
            sessionId : $cookieStore.get('sessionId'),
            name : blog.blog_name,
            description : blog.description,
            created : $scope.date
        }
        EmployeeService.addBlog(data)
        .then(function(user){
            $scope.blogAddedMsg = user;
            if ($scope.blogAddedMsg == "1 records UPDATED successfully" ) {};
            
        })
        .catch(function(err){
            
        });

        var data2 = {
            sessionId : $cookieStore.get('sessionId'),
            id: $cookieStore.get('userId')
        }
        console.log(data2);

        EmployeeService.addUserBlogRel(data2)
        .then(function(user){

            
        })
        .catch(function(err){
            
        });

        blog.name = $cookieStore.get('userName');
        blog.blog_created = $scope.date;
        $scope.blogs.push(blog); 
    };

  	$scope.getBlogs = function(){
        var data = {
            sessionId : $cookieStore.get('sessionId'),
        }
        EmployeeService.getBlogs(data)
        .then(function(user){
            $scope.blogs = user.records;
        })
        .catch(function(err){
            
        });
    }

    $scope.emplId = function(id){
      EmployeeService.userId = id;
    }

    $scope.blogId = function(blog){
        BlogService.blog = blog;
    }

    $scope.getBlogs();

  });
