'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CategoryctrlCtrl
 * @description
 * # CategoryctrlCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CategoryCtrl', function ($scope, $routeParams, $location, Category, Utils, $timeout) {
    $scope.categoryId = parseInt($routeParams.categoryslug);
    $scope.page       = 0;
    $scope.title      = 'global.loading';
    $scope.loaded     = false;
    $scope.infiniteLoading = false;
    $scope.infiniteDisabled = true;

    if (isNaN($scope.categoryId)) {
      return $location.path('/');
    }

    if (isNaN($scope.page)) {
      $scope.page = 0;
    }

    $scope.loading = true;
    $scope.category = null;

    Category
      .get($scope.categoryId, $scope.page)
      .then(function(category){
        $scope.loading = false;
        if (!category.products) {
          return $scope.error = true;
        }
        //$scope.title = category.items.item.label;
        $scope.category = category;
        $timeout(function(){$scope.infiniteDisabled = false;});
      }, function(){
        $scope.error = true;
        $scope.loading = false;
      })
    ;

    $scope.loadMore = function(){
      if ($scope.infiniteLoading || $scope.infiniteDisabled) {
        return ;
      }
      $scope.infiniteLoading = true;
      Category
        .get($scope.categoryId, ++$scope.page)
        .then(function(category){
          $scope.infiniteLoading = false;
          if (!category.products) {
            return $scope.infiniteDisabled = true;
          }
          angular.forEach(category.products.item, function(key) {
            $scope.category.products.item.push(key);
          });
        }, function(){
          $scope.infiniteLoading = false;
        })
      ;
    };

    $scope.goToProduct = function(product) {
      $location.path('/product/' + product.entity_id + '-' + Utils.slugify(product.name))
    };
  });
