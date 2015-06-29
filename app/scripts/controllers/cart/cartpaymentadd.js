'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartPaymentAddCtrl
 * @description
 * # CartPaymentAddCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartPaymentAddCtrl', function ($scope, User, Cart) {
    if (!User.isLoggued()) {
      return User.goToLogin('/cart');
    }

    $scope.title = 'cart.payment.title';
    $scope.loading = false;

    $scope.save_my_card = true;

    window.logVals = function(){
      console.log('owner', $scope.owner);
      console.log('cardNumber', $scope.cardNumber);
      console.log('cardType', $scope.cardType);
      console.log('cardExpiry', $scope.cardExpiry);
      console.log('cardCvc', $scope.cardCvc);
      console.log('save_my_card', $scope.save_my_card);
    };

    var isOk = function() {
      $scope.error = null;
      if (!$scope.cardNumber) {
        $scope.error = 'card.error.number';
        return false;
      }
      if (!$scope.cardExpiry) {
        $scope.error = 'card.error.exp';
        return false;
      }
      if (!$scope.cardCvc) {
        $scope.error = 'card.error.cvc';
        return false;
      }

      return true;
    };

    $scope.submitForm = function(){
      if (!isOk()) {
        return false;
      }

      $scope.loading = true;
      Cart.pay({
        'payment[method]':       'cryozonic_stripe',
        'payment[cc_owner]':     $scope.owner,
        'payment[cc_number]':    $scope.cardNumber,
        'payment[cc_exp_month]': $scope.cardExpiry.month,
        'payment[cc_exp_year]':  $scope.cardExpiry.year,
        'payment[cc_cid]':       $scope.cardCvc,
        'payment[cc_save]':      $scope.save_my_card ? 'on' : 'new_card'
      })
        .then(function(orderId){
          console.log('OrderId', orderId);
        }, function(error){
          $scope.loading = false;
          $scope.error = error;
        })
      ;
    };

    //exp_date: 'Date d\'expiration',
    //  cvc: 'Cryptogramme',
    //  reusable: 'Mémoriser pour mes prochains achats',
    //  error_number: 'Numéro de carte erroné',
    //  error_exp: 'Date d\'expiration erronée',
    //  error_cvc: 'Cryptogramme erroné',
    //
    //
    //<pre>
    //Expire: {{ cardExpiry }}
    //Crypto: {{  }}
    //Rememb: {{  }}
    //</pre>
    //
    //

  });
