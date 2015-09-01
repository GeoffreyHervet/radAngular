'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartBillingAddressListCtrl
 * @description
 * # CartBillingAddressListCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartBillingAddressListCtrl', function ($scope, User, Address, $state, LocalStorage) {
    if (!User.isLoggued()) {
      return User.goToLogin($state.href('app.cart'));
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
        if (!addresses || !addresses.length) {
          return $state.go('app.cart.billing.new');
        }
      }, function(err){
        $scope.loading = false;
        $scope.error = err;
      })
    ;

    $scope.useAddress = function(address) {
      $scope.masterLoading = true;
      $scope.error = null;

      Address.add({
        'billing_address_id': address.entity_id,
        'billing[use_for_billing]': '',
        'billing[firstname]': '',
        'billing[lastname]': '',
        'billing[street][0]': '',
        'billing[street][1]': '',
        'billing[city]': '',
        'billing[postcode]': '',
        'billing[telephone]': '',
        'billing[save_in_address_book]': 1,
        'billing[region_id]': '',
        'billing[country_id]': ''
      }, true)
        .then(function(response){
          if (response.data.message && response.data.message.status == 'success') {
            return $state.go('app.cart.confirm');
            //return $state.go('app.cart.' + (LocalStorage.get('go_detail_cart') ? 'confirm' : 'payment'));
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
