'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountProfileCtrl
 * @description
 * # MyAccountProfileCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountProfileCtrl', function ($scope, User, $location) {
    if (!User.isLoggued()) {
      User.goToLogin($location.path());
    }

    $scope.loading = true;
    $scope.loadingNewsletter = true;
    $scope.title = 'myaccount.profile.title';
    $scope.user = null;

    User
      .getInfos()
      .then(function(data){
        $scope.loading = false;
        $scope.user = data;
        $scope.user.newsletter = 1;

        $scope.$watch('user.newsletter', function(val){
          User.updateNewsletter(val);
        });

      }, function(e){
        $scope.loading = false;
        $scope.error = e;
      })
    ;

    $scope.submitForm = function(){

    };

  });
