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
    //if (!User.isLoggued()) {
    //  return User.goToLogin($state.href('app.cart'));
    //}

    LocalStorage.put('go_detail_cart', 1);

    $scope.title      = 'cart.title';
    $scope.loading    = true;
    $scope.promo      = '';
    $scope.promoapplied = '';
    $scope.error      = false;
    $scope.info       = 'cart.reloading';

    var setViewData = function(cartDetails, loadingValue){
      cartDetails.then(function(data){
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
        $scope.loading   = false;
        setViewData(Cart.getDetails(), false);
      }, function(){
        $scope.loading  = false;
        $scope.error    = 'error.connexion_lost';
      })
    ;

    var checkOk = function(){
      if ($scope.details.empty) {
        $scope.error = 'cart.empty';
        return false;
      }
      if ($scope.formatAddress(null) == $scope.formatAddress($scope.fullDetails.addresses.shipping_address)) {
        $state.go('app.cart.delivery');
        return false;
      }
      if ($scope.formatAddress(null) == $scope.formatAddress($scope.fullDetails.addresses.billing_address)) {
        $state.go('app.cart.billing');
        return false;
      }
      if (!$scope.payData) {
        $state.go('app.cart.payment');
        return false;
      }

      return true;
    };

    $scope.pay = function(){
      if (!checkOk()) {
        return false;
      }
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
      if (!addr || !addr.street || !addr.postcode) {
        return 'cart.address.add'
      }
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
