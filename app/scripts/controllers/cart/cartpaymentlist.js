'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartPaymentListCtrl
 * @description
 * # CartPaymentListCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartPaymentListCtrl', function ($scope, User, SavedCards) {
    if (!User.isLoggued()) {
      return User.goToLogin('/cart');
    }

    $scope.title = 'cart.payment.title';
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

    };

    $scope.format = function(card){
      console.log(card);
      return 'Carte de paiement';
    };
  });
