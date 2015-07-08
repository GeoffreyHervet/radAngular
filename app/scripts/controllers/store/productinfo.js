'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:ProductInfoCtrl
 * @description
 * # ProductInfoCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('ProductInfoCtrl', function ($scope, $routeParams, $location, Product, Utils) {
    $scope.productId  = parseInt($routeParams.productslug);
    $scope.title      = 'global.loading';

    $scope.loading      = true;
    $scope.error        = false;
    $scope.product      = null;

    Product
      .get($scope.productId)
      .then(function(product){
        $scope.loading  = false;
        $scope.title    = 'product.info';
        $scope.product  = product;
        window.product = product;
      }, function(){
        $scope.error = true;
        $scope.loading = false;
        // description = info
        // specificities

      })
    ;
  });
