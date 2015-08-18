'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartCreateBillingAddressCtrl
 * @description
 * # CartCreateBillingAddressCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartCreateBillingAddressCtrl', function ($scope, Address, User, $state, LocalStorage, Lang) {
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
    $scope.state = '';
    $scope.country = Lang.get().toUpperCase();
    $scope.validPhone = false;

    $scope.validUpdate = function(val) {
      $scope.validPhone = val;
    };


    $scope.submitForm = function(){
      $scope.error = null;

      if (!$scope.validPhone) {
        $scope.error = 'error.phone_number';
        return ;
      }

      $scope.loading = true;

      Address.add({
        'billing[firstname]': $scope.firstname,
        'billing[lastname]': $scope.lastname,
        'billing[street][0]': $scope.street,
        'billing[street][1]': $scope.street1,
        'billing[city]': $scope.city,
        'billing[postcode]': $scope.postcode,
        'billing[telephone]': $scope.telephone,
        'billing[region_id]': (typeof $scope.state == 'object' ? $scope.state._code : $scope.state),
        'billing[country_id]': (typeof $scope.country == 'object' ? $scope.country._code : $scope.country),
        'billing[save_in_address_book]': 1
      }, true)
        .then(function(response){
          if (response.data.message && response.data.message.status == 'success') {
            return $state.go('app.cart.' + (LocalStorage.get('go_detail_cart') ? 'confirm' : 'payment'));
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
