'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartCtrl', function ($scope, Cart, User, $location) {
    if (!User.isLoggued()) {
      return User.goToLogin('/cart');
    }

    $scope.title      = 'cart.confirm';
    $scope.loading    = true;
    $scope.error      = false;
    $scope.info       = 'cart.reloading';

    var setViewData = function(cartDetails){
      cartDetails.then(function(){
        $scope.details = Cart.getFormattedDetails();
      });
    };

    setViewData(Cart.getDetails());

    console.log('JE suis là');
    Cart
      .getDetails(true)
      .then(function(){
        $scope.loading  = false;
        $scope.error    = null;
        $scope.info     = null;
        console.log('ICI');
        setViewData(Cart.getDetails());
      }, function(){
        $scope.loading  = false;
        $scope.error    = 'error.connexion_lost';
      })
    ;

    $scope.goTo = function(path){
      $location.path(path);
    };
  });
