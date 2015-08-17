'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountAddressesAddCtrl
 * @description
 * # MyAccountAddressesAddCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountAddressesAddCtrl', function ($scope, User, Address, Lang, $state, Configuration, Utils, $timeout) {
    if (!User.isLoggued()) {
      return User.goToLogin();
    }

    $scope.title      = 'myaccount.profile.addresses_add';
    $scope.loading    = false;

    $scope.states     = null;
    $scope.countries  = null;

    $scope.firstname = '';
    $scope.lastname = '';
    $scope.street = '';
    $scope.street1 = '';
    $scope.city = '';
    $scope.postcode = '';
    $scope.telephone = '';
    $scope.state = '';

    $scope.country = Lang.get().toUpperCase();
    $scope.state = '';

    $scope.countries = [];

    var configCountry = function(config) {
      if (config.states && config.states.state) {
        if (!$scope.state) {
          $scope.state = 'NY';
        }
        $scope.states = config.states.state;
        angular.forEach($scope.states, function(st){
          if ($scope.state == st._code) {
            $scope.state = st;
          }
        });

      }
      if (config.allowed_countries && config.allowed_countries.country) {
        $scope.countries = Utils.arrayfy(config.allowed_countries.country);
        angular.forEach($scope.countries, function(country){
          if ($scope.country == country._code) {
            $scope.country = country;
          }
        });
        if ($scope.countries.length < 2) {
          $scope.country = $scope.countries[0];
        }
      }
    };


    $timeout(function() {
      if (Configuration.done()) {
        configCountry(Configuration.data());
      }
      else {
        if (Configuration.initInProgress()) {
          console.log(Configuration.promise);
          Configuration.promise.then(configCountry);
        }
      }
    });


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
        'region_id': $scope.state
      }).then(function(){
        return $state.go('app.my-account.addresses');
      }, function(error){
        $scope.loading = false;
        $scope.error = error;
      });
    };

  });
