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

    // Credentials
    $scope.email = '';
    $scope.password = '';

    $scope.submitForm = function() {
      console.log('Je suis là');
      console.log('Email', $scope.email);
      console.log('Password', $scope.password);

      return false;
    };

  });
