'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('LogoutCtrl', function ($state, User, $timeout, LocalStorage, $cookies, $cookieStore) {
    User.logout();
    LocalStorage.clear();
    angular.forEach($cookies, function (v, k) {
      $cookieStore.remove(k);
    });
    $timeout(function(){
      $state.go('app.store');
    }, 2000);
  });
