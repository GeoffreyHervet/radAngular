'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:SuccessCtrl
 * @description
 * # SuccessCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('SuccessCtrl', function ($scope, LocalStorage) {
    $scope.title = 'cart.success';
    $scope.order = LocalStorage.get('order_id');
  });
