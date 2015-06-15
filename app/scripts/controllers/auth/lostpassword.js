'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:LostpasswordCtrl
 * @description
 * # LostpasswordCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('LostPasswordCtrl', function ($scope, $rootScope, User, $timeout, $location) {
    $scope.title = 'lostpass.title';
    $rootScope.bodyClass = 'gray';

    $scope.email = '';
    $scope.loading = false;
    $scope.error = null;
    $scope.false = true;

    $scope.submitForm = function(){
      $scope.loading = true;
      $scope.error = null;

      User
        .forgotPassword($scope.email)
        .then(function(data){
          $scope.loading = false;
          if (data.message.status == 'success') {
            $scope.success = 'lostpass.success';
            $scope.error = null;
            $scope.translateData = {email: $scope.email};
            $timeout(function(){
              $location.path('/');
            }, 5000);
          }
          else {
            $scope.error = data.message.text;
          }

        }, function(){
          $scope.loading = false;
          $scope.error = 'error.connexion_lost';
        })
      ;

    };
  });
