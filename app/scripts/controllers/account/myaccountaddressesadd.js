'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountAddressesAddCtrl
 * @description
 * # MyAccountAddressesAddCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountAddressesAddCtrl', function ($scope, User, Address, Lang, $location, ENV) {
    if (!User.isLoggued()) {
      return User.goToLogin();
    }

    $scope.title = 'myaccount.profile.addresses_add';
    $scope.loading = false;


    $scope.firstname = '';
    $scope.lastname = '';
    $scope.street = '';
    $scope.street1 = '';
    $scope.city = '';
    $scope.postcode = '';
    $scope.telephone = '';

    if (ENV.name == 'development') {
      $scope.firstname = 'Geoffrey';
      $scope.lastname = 'Hervet';
      $scope.street = '5 avenue Édouard Vaillant';
      $scope.street1 = 'Code 34A76';
      $scope.city = 'Pantin';
      $scope.postcode = '93500';
      $scope.telephone = '06 29 50 19 89';
    }

    $scope.submitForm = function(){
      $scope.loading = true;
      $scope.error = null;
      Address.edit({
        'firstname': $scope.firstname,
        'lastname': $scope.lastname,
        'street[0]': $scope.street,
        'street[1]': $scope.street1,
        'city': $scope.city,
        'postcode': $scope.postcode,
        'telephone': $scope.telephone,
        'save_in_address_book': 1,
        'country_id': Lang.get()
      }).then(function(){
        $location.path('/my-account/addresses');
      }, function(error){
        $scope.loading = false;
        $scope.error = error;
      });
    };

  });
