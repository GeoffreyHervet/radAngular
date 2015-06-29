'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartPaymentListCtrl
 * @description
 * # CartPaymentListCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartPaymentListCtrl', function ($scope, User, Cart, SavedCards) {
    if (!User.isLoggued()) {
      return User.goToLogin('/cart');
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
      }, function(err){
        $scope.loading = false;
        $scope.error = err;
      })
    ;


    $scope.usePayment = function(payment){
      $scope.masterLoading = true;
      Cart.pay({
        'payment[method]':       'cryozonic_stripe',
        'payment[cc_saved]':     payment.id,
      })
        .then(function(orderId){
          console.log('OrderId', orderId);
        }, function(error){
          $scope.masterLoading = false;
          $scope.error = error;
        })
      ;
    };

    $scope.format = function(card){
      console.log(card);
      return 'Carte de paiement';
    };
  });
