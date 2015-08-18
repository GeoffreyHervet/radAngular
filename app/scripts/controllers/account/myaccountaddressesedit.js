'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountAddressesEditCtrl
 * @description
 * # MyAccountAddressesEditCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountAddressesEditCtrl', function ($scope, User, Address, Lang, $state, $stateParams) {
    if (!User.isLoggued()) {
      return User.goToLogin();
    }


    $scope.title = 'myaccount.profile.addresses_edit';
    $scope.loading = true;
    $scope.address = null;
    $scope.id = parseInt($stateParams.id);

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

    $scope.state = '';

    $scope.addresses = [];
    Address
      .getAddresses()
      .then(function(addresses){
        $scope.loading = false;
        angular.forEach(addresses, function(address){
          if (address.entity_id == $scope.id) {
            setAddress($scope.address = address);
          }
        });
        $scope.addresses = addresses;
      }, function(err){
        $scope.loading = false;
        $scope.error = err;
      })
    ;

    var setAddress = function(address) {
      $scope.country = address.country_id;
      $scope.firstname = address.firstname;
      $scope.lastname = address.lastname;
      $scope.street = address.street;
      $scope.street1 = address.street == address.street1 ? '' : address.street1;
      $scope.city = address.city;
      $scope.postcode = address.postcode;
      $scope.telephone = address.telephone;
      $scope.state = address.region_id;
      $scope.country_id = address.firstname;
    };

    $scope.submitForm = function(){
      $scope.loading = true;
      $scope.error = null;
      Address.edit({
        id:             $scope.id,
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
        //
        //'firstname':    $scope.address.firstname,
        //'lastname':     $scope.address.lastname,
        //'street[0]':    $scope.address.street1,
        //'street[1]':    $scope.address.street2,
        //'city':         $scope.address.city,
        //'postcode':     $scope.address.postcode,
        //'telephone':    $scope.address.telephone,
        //'country_id':   Lang.get().toUpperCase()
      }).then(function(){
        return $state.go('app.my-account.addresses');
      }, function(error){
        $scope.loading = false;
        $scope.error = error;
      });
    };

    $scope.deleteAddress = function(){
      $scope.loading = true;
      Address.delete($scope.id).then(function(){
        return $state.go('app.my-account.addresses');
      })
    };

  });
