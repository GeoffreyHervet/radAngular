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

    $scope.title      = 'cart.title';
    $scope.loading    = true;
    $scope.error      = false;
    $scope.info       = 'cart.reloading';

    var setViewData = function(cartDetails){
      cartDetails.then(function(){
        $scope.ids = [];

        angular.forEach(Cart.getFormattedDetails().items, function(item){
          $scope.ids.push(item.entity_id);
        });
        if ($scope.ids.length == 1) {
          $scope.ids = $scope.ids[0];
        }
        else if (!$scope.ids.length) {
          $scope.ids = '';
        }

        $scope.details = Cart.getFormattedDetails();
      });
    };

    setViewData(Cart.getDetails());

    Cart
      .reload(true)
      .then(function(){
        $scope.loading  = false;
        $scope.error    = null;
        $scope.info     = null;
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
