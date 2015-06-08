'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('RegisterCtrl', function ($scope, $rootScope) {
    $scope.title = 'Connexion';
    $rootScope.bodyClass = 'gray';

    // Credentials\
    $scope.firstname = '';
    $scope.lastname  = '';
    $scope.email     = '';
    $scope.password  = '';
    $scope.birthday  = '';
    $scope.cell      = '';

    $scope.submitForm = function() {
      console.log('Je suis là');
      console.log('firstname', $scope.firstname);
      console.log('lastname ', $scope.lastname );
      console.log('email    ', $scope.email    );
      console.log('password ', $scope.password );
      console.log('birthday ', $scope.birthday );
      console.log('cell     ', $scope.cell     );

      return false;
    };

  });
