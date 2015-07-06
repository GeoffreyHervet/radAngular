'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('RegisterCtrl', function ($scope, User, $location) {
    $scope.title = 'register.title';

    // Credentials
    $scope.firstname = '';
    $scope.lastname  = '';
    $scope.email     = '';
    $scope.password  = '';

    $scope.loading  = false;
    $scope.error    = null;
    $scope.errors   = null;

    var getParams = function(){
      return {
        email:          $scope.email,
        password:       $scope.password,
        confirmation:   $scope.password,
        is_subscribed:  true,
        firstname:      $scope.firstname,
        lastname:       $scope.lastname
      }
    };

    $scope.submitForm = function() {
      $scope.loading  = true;
      $scope.error    = null;
      $scope.errors   = null;
      User
        .register(getParams())
        .then(function(data){
          if (data.message.status == 'success') {
            $location.path(User.getBackPath());
          } else {
            $scope.loading = false;
            $scope.errors  = data.message.text;
          }
        }, function(){
          $scope.loading = false;
          $scope.error = 'error.connexion_lost';
        })
      ;
    };

  });
