'use strict';

/**
 * @ngdoc overview
 * @name chatpayApp
 * @description
 * # chatpayApp
 *
 * Main module of the application.
 */
angular
  .module('chatpayApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'btford.socket-io',
    'angular-md5',
    'luegg.directives',
    'http-auth-interceptor',
    'ui.bootstrap'
  ])
  .constant('moment', moment)
  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    var resolve = {
      auth: function($location, UserService, $cookieStore){
        // return UserService.profile()
        // .then(function(user){
          
        // })
        // .catch(function(err){
        //   $location.path('/');
        // })
      }
    };
    
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        //resolve: resolve
      })
      .when('/employees', {
        templateUrl: 'views/employees.html',
        controller: 'EmployeesCtrl',
        //resolve: resolve
      })
      .when('/employee/:id', {
        templateUrl: 'views/employee.html',
        controller: 'EmployeeCtrl',
        //resolve: resolve
      })
      .when('/language', {
        templateUrl: 'views/language.html',
        controller: 'LanguageCtrl',
        //resolve: resolve
      })
      .when('/language/:id', {
        templateUrl: 'views/lang.html',
        controller: 'LanguuageCtrl',
        //resolve: resolve
      })
      .when('/project', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        //resolve: resolve
      })
      .when('/project/:id', {
        templateUrl: 'views/projectDesc.html',
        controller: 'ProjectInfoCtrl',
        //resolve: resolve
      })
      .when('/gallery', {
        templateUrl: 'views/gallery.html',
        controller: 'GalleryCtrl',
        //resolve: resolve
      })
      .when('/ask', {
        templateUrl: 'views/ask.html',
        controller: 'AskCtrl',
        //resolve: resolve
      })
      .when('/myCarousel', {
        templateUrl: 'views/ask.html',
        controller: 'AskCtrl',
        //resolve: resolve
      })
      .when('/blogs', {
        templateUrl: 'views/blogs.html',
        controller: 'BlogsCtrl',
        //resolve: resolve
      })
      .when('/blogs/:id', {
        templateUrl: 'views/blogDesc.html',
        controller: 'BlogDescCtrl',
        //resolve: resolve
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        //resolve: resolve
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
