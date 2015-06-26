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
    $scope.loading    = true;
    $scope.error      = false;

    var setViewData = function(cartDetails){
      cartDetails.then(function(){
        $scope.details = Cart.getFormattedDetails();
      });
    };

    setViewData(Cart.getDetails());

    Cart
      .getDetails(true)
      .then(function(){
        $scope.loading = false;
        $scope.error = null;
        setViewData(Cart.getDetails());
      }, function(){
        $scope.loading = false;
        $scope.error = 'error.connexion_lost';
      })
    ;
  });
