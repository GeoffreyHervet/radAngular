'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartBillingAddressListCtrl
 * @description
 * # CartBillingAddressListCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartBillingAddressListCtrl', function ($scope, User, Address, $location) {
    if (!User.isLoggued()) {
      return User.goToLogin('/cart');
    }

    $scope.title = 'cart.billing.title';
    $scope.masterLoading = false;
    $scope.loading = true;
    $scope.addresses = [];
    Address
      .getAddresses()
      .then(function(addresses){
        $scope.loading = false;
        $scope.addresses = addresses;
      }, function(err){
        $scope.loading = false;
        $scope.error = err;
      })
    ;

    $scope.useAddress = function(address) {
      $scope.masterLoading = true;
      $scope.error = null;

      Address.add({
        'billing_address_id': address.entity_id
      })
        .then(function(response){
          if (response.data.message && response.data.message.status == 'success') {
            return $location.path('/cart/payment');
          }
          $scope.masterLoading = false;
          $scope.error = response.data.message.text || 'error.unknown_reason';
        }, function(){
          $scope.masterLoading = false;
          $scope.error = 'error.connexion_lost';
        })
      ;

      return false;
    };
  });
