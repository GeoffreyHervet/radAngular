'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountProfileEmailCtrl
 * @description
 * # MyAccountProfileEmailCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountProfileEmailCtrl', function ($scope, $location, User, $timeout) {
    if (!User.isLoggued()) {
      User.goToLogin($location.path());
    }

    $scope.loading = true;
    $scope.title = 'myaccount.profile.email';
    $scope.user = null;
    $scope.email = '';
    $scope.password = '';
    $scope.translateData = {email: $scope.email};

    User
      .getInfos()
      .then(function(data){
        $scope.loading = false;
        $scope.user = data;
        $scope.translateData = {email: data.email + ''};
      }, function(e){
        $scope.loading = false;
        $scope.error = e;
      })
    ;

    $scope.submitForm = function(){
      $scope.success = null;
      $scope.error = null;
      $scope.loading = true;
      User
        .updateEmail($scope.email, $scope.password)
        .then(function(msg){
          $scope.success = msg;
          $scope.loading = false;
          $timeout(function(){
            $location.path('/my-account/profile');
          }, 5000);

        }, function(error){
          $scope.error = error;
          $scope.loading = false;
        })
    };


  });
