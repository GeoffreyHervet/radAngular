'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:ConnexionctrlCtrl
 * @description
 * # ConnexionctrlCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('ConnexionCtrl', function ($scope, User, $location, $routeParams) {
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

    $scope.facebookAuth = function(){
      $scope.loading = true;
      User
        .facebookAuth()
        .then(function(){
          $location.path(User.getBackPath());
        }, function(error){
          $scope.loading = false;
          $scope.error = error;
        })
      ;
    };

    var hash = location.href.split('code=');
    if (hash.length > 1) {
      $scope.loading = true;
      User
        .facebookAuth(hash[1].split('#')[0])
        .then(function(){
          location.href = '/#' + User.getBackPath();
        }, function(error){
          $scope.loading = false;
          $scope.error = error;
        })
      ;
    }

  });
