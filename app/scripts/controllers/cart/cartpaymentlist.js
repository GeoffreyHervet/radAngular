'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartPaymentListCtrl
 * @description
 * # CartPaymentListCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartPaymentListCtrl', function ($scope, User, Cart, SavedCards, $state, LocalStorage) {
    if (!User.isLoggued()) {
      return User.goToLogin($state.href('app.cart'));
    }

    $scope.title = 'cart.payment.title';
    $scope.masterLoading = false;
    $scope.loading = true;
    $scope.payments = [];
    SavedCards
      .get()
      .then(function(payments){
        $scope.loading = false;
        $scope.payments = payments;
        if (!payments || !payments.length) {
          return $state.go('app.cart.payment.add');
        }
      }, function(err){
        $scope.loading = false;
        $scope.error = err;
      })
    ;

    $scope.usePayment = function(payment){
      LocalStorage.putObject('payData', {'payment[method]': 'cryozonic_stripe', 'payment[cc_saved]':payment.id, card: payment}, 99999);
      $state.go('app.cart.confirm');
      //$scope.masterLoading = true;
      //Cart.pay({
      //  'payment[method]':       'cryozonic_stripe',
      //  'payment[cc_saved]':     payment.id
      //})
      //  .then(function(orderId){
      //    Cart.clear();
      //    LocalStorage.put('order_id', orderId);
      //    return $stage.go('app.cart.success');
      //  }, function(error){
      //    $scope.masterLoading = false;
      //    $scope.error = error;
      //  })
      //;
    };

    $scope.format = function(card){
      return card.type + ' ' + card.number.slice(-4);
    };
  });
