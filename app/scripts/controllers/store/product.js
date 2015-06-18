'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('ProductCtrl', function ($scope, $routeParams, $location, Product) {
    $scope.productId  = parseInt($routeParams.productslug);
    $scope.title      = 'global.loading';

    $scope.loading  = true;
    $scope.product  = null;
    $scope.images   = [];
    $scope.options  = [];

    Product
      .get($scope.productId)
      .then(function(product){
        $scope.loading  = false;
        $scope.product  = product;
        $scope.images   = ['http://geoffrey.pro/img2.png', 'http://geoffrey.pro/img1.png'];
        $scope.title    = product.name;
        window.product = product;
        $scope.options  = Array.isArray(product.product.options.option) ? product.product.options.option : [product.product.options.option];
        if (!product.product.options.option) {
          $scope.options = [];
        }
      }, function(){
        $scope.error = true;
        $scope.loading = false;
      })
    ;
  });
