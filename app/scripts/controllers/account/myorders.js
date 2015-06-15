'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyOrdersCtrl
 * @description
 * # MyOrdersCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyOrdersCtrl', function ($scope, User, $location) {
    if (!User.getToken()) {
      return $location.path('/login');
    }

    $scope.loading = true;
    $scope.orders = [];


    

  });
