'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountAddressesCtrl
 * @description
 * # MyAccountAddressesCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountAddressesCtrl', function ($scope, User, Address) {
    if (!User.isLoggued()) {
      return User.goToLogin();
    }

    $scope.title = 'myaccount.profile.addresses';
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
