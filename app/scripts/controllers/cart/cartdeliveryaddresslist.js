'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartDeliveryAddressListCtrl
 * @description
 * # CartDeliveryAddressListCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartDeliveryAddressListCtrl', function ($scope, User, Address, $state, LocalStorage) {
    if (!User.isLoggued()) {
      return User.goToLogin($state.href('app.cart'))
    }

    var currentState = $state.$current.name;
    $scope.title = 'cart.delivery.title';
    $scope.masterLoading = false;
    $scope.loading = true;
    $scope.addresses = [];
    Address
      .getAddresses(true)
      .then(function(addresses){
        $scope.loading = false;
        if ((!addresses || !addresses.length) && $state.$current.name == currentState) {
          return $state.go('app.cart.delivery.new');
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
        'shipping[use_for_billing]': 1,
        'shipping_address_id': address.entity_id
      })
        .then(function(response){
          if (response.data.message && response.data.message.status && response.data.message.status == 'error') {
            if (response.data.message.logged_in == 0) {
              User.logout();
              return User.goToLogin();
            }
          }
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
