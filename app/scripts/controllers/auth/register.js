'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('RegisterCtrl', function ($scope, User, $location, LocalStorage) {
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
      LocalStorage.put('firstname', $scope.firstname);
      LocalStorage.put('lastname',  $scope.lastname);
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
            var back = User.getBackPath();
            location.href = back;
          } else {
            $scope.loading = false;
            $scope.errors  = data.message.text;
          }
        }, function(e){
          $scope.loading = false;
          $scope.error = e ? e : 'error.connexion_lost';
        })
      ;
    };

    $scope.facebookAuth = function(){
      $scope.loading = true;
      User
        .facebookAuth()
        .then(function(){
          var back = User.getBackPath();
          location.href = back;
        }, function(error){
          $scope.loading = false;
          $scope.error = error;
        })
      ;
    };

    //if ((navigator.userAgent.match('CriOS') || window.devmode)) {
    //  $scope.facebookAuth = function(){
    //    if (Lang.get() == 'fr') {
    //      alert('Pour vous connecter avec facebook, merci d\'utiliser Safari.');
    //    }
    //    else  {
    //      alert('For sign-in with Facebook, please use Safari.');
    //    }
    //  };
    //}


  });
