'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .controller('BlogDescCtrl', function ($scope, $location, $cookieStore, BlogService, EmployeeService) {

    $scope.blog = BlogService.blog;


    $scope.showEditBlog = false;

    $scope.toggleEditBlog = function(){
        $scope.showEditBlog = !$scope.showEditBlog;
    }

    $scope.blog2 = $scope.blog;

    $scope.editBlog =  function(blog){

        var data = {
            sessionId : $cookieStore.get('sessionId'),
            name : blog.blog_name,
            description : blog.description,
            id: blog.blog_id
        }
        BlogService.editBlog(data)
        .then(function(user){
            $scope.blogAddedMsg = user;
            if ($scope.blogAddedMsg == "1 records UPDATED successfully" ) {

            };
            
        })
        .catch(function(err){
            
        });


        $scope.blog.blog_name = blog.blog_name;
        $scope.blog.description = blog.description;
      
        
    };

    $scope.date = new Date();
    $scope.date = $scope.date.toDateString();

    $scope.submitComment = function(comment){
      var data = {
            sessionId : $cookieStore.get('sessionId'),
            comment : comment,
            blog_id: $scope.blog.blog_id,
            user_id: $cookieStore.get('userId'),
            user_name: $cookieStore.get('userName'),
            created : $scope.date
        }

        BlogService.submitComment(data)
        .then(function(user){
            $scope.blogAddedMsg = user;
            if ($scope.blogAddedMsg == "1 records UPDATED successfully" ) {

            };
            
        })
        .catch(function(err){
            
        });

        $scope.comments.push(data);

        
    }

    $scope.emplId = function(id){
      EmployeeService.userId = id;
    }


    $scope.getComment = function(){
      var data = {
            sessionId : $cookieStore.get('sessionId'),
            blog_id: $scope.blog.blog_id
        }

        BlogService.getComment(data)
        .then(function(user){
          console.log(user.records);
          $scope.comments = user.records;
            
        })
        .catch(function(err){
            
        });
    };

    $scope.getComment();

  });











