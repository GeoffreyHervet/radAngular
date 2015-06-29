'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartBillingAddressListCtrl
 * @description
 * # CartBillingAddressListCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartBillingAddressListCtrl', function ($scope, User, Address) {
    if (!User.isLoggued()) {
      return User.goToLogin('/cart');
    }

    $scope.title = 'cart.billing.title';
    $scope.masterLoading = false;
    $scope.loading = true;
    $scope.addresses = [];
    Address
      .getAddresses(true)
      .then(function(addresses){
        $scope.loading = false;
        $scope.addresses = addresses;
      }, function(err){
        $scope.loading = false;
        $scope.error = err;
      })
    ;
  });
