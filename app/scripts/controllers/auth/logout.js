'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('LogoutCtrl', function ($scope, $location, User, $timeout, LocalStorage, $cookies) {
    User.logout();
    LocalStorage.clear();
    angular.forEach($cookies, function (v, k) {
      $cookieStore.remove(k);
    });
    $timeout(function(){
      $location.path('/');
    }, 2000);
  });
