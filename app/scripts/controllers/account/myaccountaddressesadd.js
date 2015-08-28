'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountAddressesAddCtrl
 * @description
 * # MyAccountAddressesAddCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountAddressesAddCtrl', function ($scope, User, Address, Lang, $state) {
    if (!User.isLoggued()) {
      return User.goToLogin();
    }

    $scope.title      = 'myaccount.profile.addresses_add';
    $scope.loading    = false;

    $scope.firstname = '';
    $scope.lastname = '';
    $scope.street = '';
    $scope.street1 = '';
    $scope.city = '';
    $scope.postcode = '';
    $scope.telephone = '';
    $scope.state = '';
    $scope.country = Lang.get().toUpperCase();
    $scope.validPhone = false;


    $scope.validUpdate = function(val) {
      $scope.validPhone = val;
    };


    $scope.submitForm = function(){
      $scope.error = null;

      if (!$scope.firstname) {
        return $scope.error = 'error.empty.firstname';
      }
      if (!$scope.lastname) {
        return $scope.error = 'error.empty.lastname';
      }
      if (!$scope.street) {
        return $scope.error = 'error.empty.street';
      }
      if (!$scope.city) {
        return $scope.error = 'error.empty.city';
      }
      if (!$scope.postcode) {
        return $scope.error = 'error.empty.postcode';
      }

      if (!$scope.validPhone) {
        return $scope.error = 'error.phone_number';
      }

      $scope.loading = true;
      Address.edit({
        'firstname': $scope.firstname,
        'lastname': $scope.lastname,
        'street[0]': $scope.street,
        'street[1]': $scope.street1,
        'city': $scope.city,
        'postcode': $scope.postcode,
        'telephone': $scope.telephone,
        'save_in_address_book': 1,
        'region_id': (typeof $scope.state == 'object' ? $scope.state._code : $scope.state),
        'country_id': (typeof $scope.country == 'object' ? $scope.country._code : $scope.country)
      }).then(function(){
        return $state.go('app.my-account.addresses');
      }, function(error){
        $scope.loading = false;
        $scope.error = error;
      });
    };

  });
