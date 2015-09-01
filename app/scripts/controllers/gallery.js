'use strict';

/**
 * @ngdoc function
 * @name chatpayApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the chatpayApp
 */
angular.module('chatpayApp')
  .controller('GalleryCtrl', function ($scope, $location, $cookieStore, CustomerService) {
    
    $scope.images = [
  		{image : '../../images/header.jpg'},
  		{image : '../../images/login_background.jpg'},
  		{image : '../../images/back.jpg'},
  		{image : '../../images/2aa.jpg'},
  		{image : '../../images/DSC1.jpg'},
      {image : '../../images/DSC2.jpg'},
      {image : '../../images/DSC3.jpg'},
      {image : '../../images/DSC4.jpg'},
      {image : '../../images/DSC5.jpg'},
      {image : '../../images/DSC6.jpg'},
      {image : '../../images/DSC7.jpg'},
      {image : '../../images/DSC8.jpg'},
      {image : '../../images/DSC9.jpg'},
      {image : '../../images/DSC10.jpg'},
      {image : '../../images/DSC11.jpg'}
  	];

  	$scope.currentImage = _.first($scope.images);

  	$scope.setCurrentImage = function(image){
  		$scope.currentImage = image;
  	}

  });
