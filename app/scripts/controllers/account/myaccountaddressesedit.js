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


    $scope.addresses = [];
    Address
      .getAddresses()
      .then(function(addresses){
        $scope.loading = false;
        angular.forEach(addresses, function(address){
          if (address.entity_id == $scope.id) {
            $scope.address = address;
          }
        });
        $scope.addresses = addresses;
      }, function(err){
        $scope.loading = false;
        $scope.error = err;
      })
    ;

    $scope.submitForm = function(){
      $scope.loading = true;
      $scope.error = null;
      Address.edit({
        id:             $scope.id,
        'firstname':    $scope.address.firstname,
        'lastname':     $scope.address.lastname,
        'street[0]':    $scope.address.street1,
        'street[1]':    $scope.address.street2,
        'city':         $scope.address.city,
        'postcode':     $scope.address.postcode,
        'telephone':    $scope.address.telephone,
        'country_id':   Lang.get().toUpperCase()
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
