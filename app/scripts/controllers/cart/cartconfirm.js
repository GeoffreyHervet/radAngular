'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartConfirmCtrl
 * @description
 * # CartConfirmCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartConfirmCtrl', function ($scope, User, $state, Cart, LocalStorage) {
    if (!User.isLoggued()) {
      return User.goToLogin($state.href('app.cart'));
    }

    LocalStorage.put('go_detail_cart', 1);

    $scope.title      = 'cart.title';
    $scope.loading    = true;
    $scope.promo      = '';
    $scope.promoapplied = '';
    $scope.error      = false;
    $scope.info       = 'cart.reloading';

    var setViewData = function(cartDetails, loadingValue){
      cartDetails.then(function(data){
        $scope.loading = loadingValue;
        $scope.fullDetails = data;
        $scope.details = Cart.getFormattedDetails();
        $scope.payData = LocalStorage.getObject('payData');
      });
    };

    setViewData(Cart.getDetails(), false);

    Cart
      .getDetails(true)
      .then(function(){
        $scope.error    = null;
        $scope.info     = null;
        setViewData(Cart.getDetails(), false);
      }, function(){
        $scope.loading  = false;
        $scope.error    = 'error.connexion_lost';
      })
    ;

    $scope.pay = function(){
      $scope.loading = true;
      Cart.pay($scope.payData)
        .then(function(data){
          LocalStorage.put('order_id', data.id);
          LocalStorage.put('increment_id', data.increment_id);
          return $state.go('app.cart.success');
        }, function(error){
          $scope.loading = false;
          $scope.error = error;
        })
      ;
    };

    $scope.formatAddress = function(addr){
      return addr.street + ', ' + addr.postcode;
    };

    $scope.submitForm = function(){
      if ($scope.promo) {
        $scope.promoapplied = $scope.promo;
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
