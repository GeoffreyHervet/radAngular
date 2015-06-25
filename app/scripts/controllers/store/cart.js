'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartCtrl', function ($scope, Cart) {
    $scope.title      = 'cart.title';
    $scope.cart       = Cart.getDetails();
    $scope.loading    = true;
    $scope.error      = false;

    Cart
      .getDetails(true)
      .then(function(){
        $scope.loading = false;
        $scope.error = null;
        $scope.cart = Cart.getDetails();
      }, function(){
        $scope.loading = false;
        $scope.error = 'error.connexion_lost';
      })
    ;
  });
