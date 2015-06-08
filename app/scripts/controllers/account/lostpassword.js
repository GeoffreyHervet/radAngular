'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:LostpasswordCtrl
 * @description
 * # LostpasswordCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('LostPasswordCtrl', function ($scope, $rootScope) {
    $scope.title = 'lostpass.title';
    $rootScope.bodyClass = 'gray';

    $scope.email = '';

    $scope.submitForm = function(){

    };
  });
