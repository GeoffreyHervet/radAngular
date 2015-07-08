'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartConfirmCtrl
 * @description
 * # CartConfirmCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartConfirmCtrl', function ($scope, User, $location, Cart, LocalStorage) {
    if (!User.isLoggued()) {
      return User.goToLogin('/cart');
    }

    $scope.title      = 'cart.title';
    $scope.loading    = true;
    $scope.promo      = '';
    $scope.error      = false;
    $scope.info       = 'cart.reloading';

    var setViewData = function(cartDetails){
      cartDetails.then(function(){
        $scope.loading = false;
        $scope.details = Cart.getFormattedDetails();
        $scope.payData = LocalStorage.getObject('payData');
      });
    };

    setViewData(Cart.getDetails());
    $scope.loading = true;

    Cart
      .getDetails(true)
      .then(function(){
        $scope.loading  = false;
        $scope.error    = null;
        $scope.info     = null;
        setViewData(Cart.getDetails());
        //Cart.getCartDetails();
      }, function(){
        $scope.loading  = false;
        $scope.error    = 'error.connexion_lost';
      })
    ;

    $scope.goTo = function(path){
      $location.path(path);
    };

    $scope.pay = function(){
      $scope.loading = true;
      Cart.pay($scope.payData)
        .then(function(data){
          LocalStorage.put('order_id', data.id);
          LocalStorage.put('increment_id', data.increment_id);
          return $location.path('/success');
        }, function(error){
          $scope.loading = false;
          $scope.error = error;
        })
      ;
    };

    $scope.formatAddress = function(){
      return 'Attente WebService';
    };

    $scope.submitForm = function(){
      if ($scope.promo) {
        $scope.loading = true;
        Cart
          .addCoupon($scope.promo)
          .then(function(){
            setViewData(Cart.getDetails(true));
          }, function(error){
            $scope.error = error;
            $scope.loading = false;
          });
      }
    };
  });
