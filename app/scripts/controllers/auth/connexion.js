'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:ConnexionctrlCtrl
 * @description
 * # ConnexionctrlCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('ConnexionCtrl', function ($scope, User, $location) {
    $scope.title = 'Connexion';

    // Credentials
    $scope.email = '';
    $scope.password = '';

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
              $location.path(User.getBackPath());
            } else {
              $scope.loading = false;
              $scope.error = data.message.text;
            }
          },
          function() {
            $scope.loading = false;
            $scope.error = 'error.connexion_lost';
          }
      );

      return false;
    };

  });
