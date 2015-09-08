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
    console.log($scope.blog);

    $scope.showEditBlog = false;

    if ($scope.blog.extension) {
        $scope.path = '/api/blogsImages/' + $scope.blog.blog_id + '.' + $scope.blog.extension;
        console.log($scope.path);
    }else{
        $scope.path = '../../images/-1.png';
    };

    $scope.showImage = function(image){
        if (image) {
            var data = {
                sessionId : $cookieStore.get('sessionId'),
                dataURL: image.dataURL,
                extention : image.file.name,
                blogId : $scope.blog.blog_id
            }
            console.log(data);
            BlogService.uploadBlogImage(data)
            .then(function(user){
                console.log(user);
                $scope.path = '/api/' + user;

            })
            .catch(function(err){
                
            });
        };
    }



    $scope.toggleEditBlog = function(){
        $scope.showEditBlog = !$scope.showEditBlog;
    }

    if ($scope.blog.id == $cookieStore.get('userId')) {
        $scope.personalProfile = true;
    };
    
    $scope.blog2 = $scope.blog;

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
          $scope.comments = user.records;
          console.log($scope.comments);
          angular.forEach($scope.comments, function(val){
                val.path = "";
                if (val.extension) {
                    val.path = '/api/images/' + val.id + '.' + val.extension;
                }else{
                    val.path = 'http://placehold.it/64x64';
                };

            });
            
        })
        .catch(function(err){
            
        });
    };

    $scope.getComment();

  });











