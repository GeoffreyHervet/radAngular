'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('LogoutCtrl', function ($scope, $location, User) {
    User.logout();
    $location.path('/');
  });
