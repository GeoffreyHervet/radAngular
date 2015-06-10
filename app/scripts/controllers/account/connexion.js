'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:ConnexionctrlCtrl
 * @description
 * # ConnexionctrlCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('ConnexionCtrl', function ($scope, $rootScope, User, $location) {
    $scope.title = 'Connexion';
    $rootScope.bodyClass = 'gray';

    // Credentials
    $scope.email = 'jeanbon@yopmail.com';
    $scope.password = 'password';

    $scope.loading = false;
    $scope.error = null;

    $scope.submitForm = function() {

      $scope.loading = true;
      $scope.error = null;

      User
        .login($scope.email, $scope.password)
        .then(
          function(data) {
            if (data.message.status == 'success') {
              $location.path('/');
            } else {
              $scope.loading = false;
              $scope.error = data.message.text;
            }
          },
          function(error) {
            console.log('ICI2');
            $scope.error = 'error.connexion_lost';
          }
      );

      return false;
    };

  });
