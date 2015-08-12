'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartCreateDeliveryAddressCtrl
 * @description
 * # CartCreateDeliveryAddressCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartCreateDeliveryAddressCtrl', function ($scope, Address, User, $state, Lang) {
    if (!User.isLoggued()) {
      return User.goToLogin($state.href('app.cart'))
    }
    $scope.title = 'cart.delivery.title';
    $scope.loading = false;

    $scope.use_for_billing = true;
    $scope.firstname = '';
    $scope.lastname = '';
    $scope.street = '';
    $scope.street1 = '';
    $scope.city = '';
    $scope.postcode = '';
    $scope.telephone = '';

    $scope.submitForm = function(){
      $scope.loading = true;
      $scope.error = null;

      Address.add({
        'shipping[use_for_billing]': $scope.use_for_billing ? 1 : 0,
        'shipping[firstname]': $scope.firstname,
        'shipping[lastname]': $scope.lastname,
        'shipping[street][0]': $scope.street,
        'shipping[street][1]': $scope.street1,
        'shipping[city]': $scope.city,
        'shipping[postcode]': $scope.postcode,
        'shipping[telephone]': $scope.telephone,
        'shipping[save_in_address_book]': 1,
        'shipping[country_id]': Lang.get().toUpperCase()
      })
        .then(function(response){
          if (response.data.message && response.data.message.status && response.data.message.status == 'error') {
            if (response.data.message.logged_in == 0) {
              User.logout();
              return User.goToLogin();
            }
          }
          if (response.data.message && response.data.message.status == 'success') {
            if ($scope.use_for_billing) {
              return $state.go('app.cart.payment');
            }
            return $state.go('app.cart.billing');
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
