'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartDeliveryAddressListCtrl
 * @description
 * # CartDeliveryAddressListCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartDeliveryAddressListCtrl', function ($scope, User, Address, $location) {
    if (!User.isLoggued()) {
      return User.goToLogin('/cart');
    }

    $scope.title = 'cart.delivery.title';
    $scope.masterLoading = false;
    $scope.loading = true;
    $scope.addresses = [];
    Address
      .getAddresses(true)
      .then(function(addresses){
        $scope.loading = false;
        if (!addresses || !addresses.length) {
          return $location.path('/cart/delivery-address-create');
        }
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
        'shipping[use_for_billing]': 0,
        'shipping_address_id': address.entity_id
      })
        .then(function(response){
          if (response.data.message && response.data.message.status == 'success') {
            return $location.path('/cart/billing-address-list');
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
