'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartDeliveryAddressListCtrl
 * @description
 * # CartDeliveryAddressListCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartDeliveryAddressListCtrl', function ($scope, User, Address) {
    if (!User.isLoggued()) {
      return User.goToLogin('/cart');
    }

    $scope.title = 'cart.delivery.title';
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
  });
