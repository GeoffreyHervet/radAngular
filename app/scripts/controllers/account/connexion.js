'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:ConnexionctrlCtrl
 * @description
 * # ConnexionctrlCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('ConnexionCtrl', function ($scope, $rootScope) {
    $scope.title = 'Connexion';
    $rootScope.bodyClass = 'gray';

    $scope.credentials = {
      email: '',
      password: ''
    };

  });
