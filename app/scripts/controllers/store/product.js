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

    $scope.loading = true;

    Product
      .get($scope.productId)
      .then(function(product){
        $scope.loading = false;
        $scope.product = product;
      }, function(){
        $scope.error = true;
        $scope.loading = false;
      })
    ;
  });
