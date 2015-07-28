'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartCreateBillingAddressCtrl
 * @description
 * # CartCreateBillingAddressCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartCreateBillingAddressCtrl', function ($scope, Address, User, $state, LocalStorage) {
    if (!User.isLoggued()) {
      User.goToLogin('/cart');
    }
    $scope.title = 'cart.billing.title';
    $scope.loading = false;

    $scope.use_for_billing = true;
    $scope.firstname = '';
    $scope.lastname = '';
    $scope.street = '';
    $scope.street1 = '';
    $scope.city = '';
    $scope.postcode = '';
    $scope.telephone = '';

    $scope.submitForm = function(){
      $scope.loading = true;
      $scope.error = null;

      Address.add({
        'billing[firstname]': $scope.firstname,
        'billing[lastname]': $scope.lastname,
        'billing[street][0]': $scope.street,
        'billing[street][1]': $scope.street1,
        'billing[city]': $scope.city,
        'billing[postcode]': $scope.postcode,
        'billing[telephone]': $scope.telephone,
        'billing[save_in_address_book]': 1
      })
        .then(function(response){
          if (response.data.message && response.data.message.status == 'success') {
            return $state.go('app.cart.' + (LocalStorage.get('go_detail_cart') ? 'confirm' : 'payment'));
          }
          $scope.loading = false;
          $scope.error = response.data.message.text || 'error.unknown_reason';
        }, function(){
          $scope.error = 'error.connexion_lost';
        })
      ;

      return false;
    };
  });
