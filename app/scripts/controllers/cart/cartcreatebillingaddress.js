'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartCreateBillingAddressCtrl
 * @description
 * # CartCreateBillingAddressCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartCreateBillingAddressCtrl', function ($scope, Address, User, $location, ENV) {
    if (!User.isLoggued()) {
      User.goToLogin('/cart');
    }
    $scope.title = 'cart.billing.title';
    $scope.loading = false;

    $scope.use_for_billing = true;
    $scope.firstname = '';
    $scope.lastname = '';
    $scope.street = '';
    $scope.street1 = '';
    $scope.city = '';
    $scope.postcode = '';
    $scope.telephone = '';

    if (ENV.name == 'development') {
      $scope.use_for_billing = false;
      $scope.firstname = 'Jean';
      $scope.lastname = 'Michel';
      $scope.street = '35 rue des Jeuneurs';
      $scope.street1 = 'pas de digicode';
      $scope.city = 'Paris';
      $scope.postcode = '75002';
      $scope.telephone = '01 23 45 67 89';
    }


    $scope.submitForm = function(){
      $scope.loading = true;
      $scope.error = null;

      Address.add({
        'billing[firstname]': $scope.firstname,
        'billing[lastname]': $scope.lastname,
        'billing[street][0]': $scope.street,
        'billing[street][1]': $scope.street1,
        'billing[city]': $scope.city,
        'billing[postcode]': $scope.postcode,
        'billing[telephone]': $scope.telephone,
        'billing[save_in_address_book]': 1
      })
        .then(function(response){
          if (response.data.message && response.data.message.status == 'success') {
            return $location.path('/cart/payment');
          }
          $scope.loading = false;
          $scope.error = response.data.message.text || 'error.unknown_reason';
        }, function(){
          $scope.error = 'error.connexion_lost';
        })
      ;

      return false;
    };
  });
