'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('SearchCtrl', function ($scope, $routeParams, $location, Product, Utils, $timeout) {
    $scope.search     = $routeParams.q;

    $scope.page       = 0;
    $scope.title      = $scope.search;
    $scope.loaded     = false;
    $scope.fromSearch = true;
    $scope.infiniteLoading = false;
    $scope.infiniteDisabled = true;
    $scope.productsTracking = null;

    $scope.loading = true;
    $scope.category = null;

    Product
      .search($scope.search, $scope.page)
      .then(function(products){
        $scope.loading = false;
        $scope.products = products;

        var productsTracking = [];
        angular.forEach($scope.products, function(product){
          productsTracking.push(product.entity_id);
        });
        $scope.productsTracking = productsTracking;

        $timeout(function(){$scope.infiniteDisabled = false;});
        $scope.page = 1;
      }, function(e){
        $scope.error = e;
        $scope.loading = false;
      })
    ;

    $scope.loadMore = function(){
      if ($scope.infiniteLoading || $scope.infiniteDisabled || !$scope.page) {
        return ;
      }
      $scope.infiniteLoading = true;
      Product
        .search($scope.search, $scope.page++)
        .then(function(products){
          $scope.infiniteLoading = false;
          if (!products.length) {
            return $scope.infiniteDisabled = true;
          }
          angular.forEach(products, function(item) {
            $scope.products.push(item);
          });
        }, function(){
          $scope.infiniteLoading = false;
        })
      ;
    };

    $scope.goToProduct = function(product) {
      $location.search({}).path('/product/' + product.entity_id + '-' + Utils.slugify(product.name));
    };
  });
