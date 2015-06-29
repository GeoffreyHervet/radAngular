'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartCreateDeliveryAddressCtrl
 * @description
 * # CartCreateDeliveryAddressCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartCreateDeliveryAddressCtrl', function ($scope, Address, User, $location, ENV) {
    if (!User.isLoggued()) {
      User.goToLogin('/cart/delivery-address-create');
    }
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

      Address.add({
        shipping: {
          use_for_billing:  $scope.use_for_billing,
          firstname:        $scope.firstname,
          lastname:         $scope.lastname,
          street:           [$scope.street, $scope.street1],
          city:             $scope.city,
          postcode:         $scope.postcode,
          telephone:        $scope.telephone,
          save_in_address_book: true
        }
      })
        .then(function(response){
          if (response.data.message && response.data.message.status == 'success') {
            if ($scope.use_for_billing) {
              return $location.path('/cart/payment');
            }
            return $location.path('/cart/billing-address-list');
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
