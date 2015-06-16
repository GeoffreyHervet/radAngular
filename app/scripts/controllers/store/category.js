'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CategoryctrlCtrl
 * @description
 * # CategoryctrlCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CategoryCtrl', function ($scope, $routeParams, $location, Category) {
    $scope.categoryId = parseInt($routeParams.categoryslug);
    $scope.page = parseInt($routeParams.page || 0);
    $scope.title = 'global.loading';

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
        //$scope.title = category.items.item.label;
        $scope.category = category;
      }, function(){
        $scope.error = true;
        $scope.loading = false;
      })
    ;
  });
