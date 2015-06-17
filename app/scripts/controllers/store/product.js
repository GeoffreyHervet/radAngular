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
        $scope.images   = ['images/tmp-product-img1.png', 'images/tmp-product-img2.png'];
        $scope.title    = product.name;
        $scope.options  = Array.isArray(product.options.option) ? product.options.option : [product.options.option];
      }, function(){
        $scope.error = true;
        $scope.loading = false;
      })
    ;
  });
