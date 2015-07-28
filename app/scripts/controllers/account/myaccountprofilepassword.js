'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountProfilePasswordCtrl
 * @description
 * # MyAccountProfilePasswordCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountProfilePasswordCtrl', function ($scope, $state, User, $timeout) {
    if (!User.isLoggued()) {
      User.goToLogin();
    }

    $scope.loading = false;
    $scope.title = 'myaccount.profile.password';

    $scope.current = '';
    $scope.password = '';

    $scope.submitForm = function () {
      $scope.success = null;
      $scope.error = null;
      $scope.loading = true;
      User
        .updatePassword($scope.current, $scope.password)
        .then(function (msg) {
          $scope.success = msg;
          $scope.loading = false;
          $timeout(function () {
            return $state.go('app.my-account');
          }, 5000);

        }, function (error) {
          $scope.error = error;
          $scope.loading = false;
        })
    };

  });
