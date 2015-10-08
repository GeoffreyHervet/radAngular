'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:ConnexionctrlCtrl
 * @description
 * # ConnexionctrlCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('ConnexionCtrl', function ($scope, User, $location, $q, $timeout, Cart, Lang) {
    $scope.title = 'menu.login';
    var logoutPromise;
    if (User.isLoggued()) {
      logoutPromise = User.logout();
    }
    else  {
      logoutPromise = $q(function(solve){
        $timeout(function(){ solve(); }, 100);
      });
    }

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
              Cart.reload();
              var back = User.getBackPath();
              location.href = back;
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


    $scope.facebookAuth = function() {
      $scope.loading = true;
      User
        .facebookAuth()
        .then(function () {
          Cart.reload();
          var back = User.getBackPath();
          location.href = back;
        }, function (error) {
          $scope.loading = false;
          $scope.error = error;
        })
      ;
    };
    
    if ((navigator.userAgent.match('CriOS') || window.devmode)) {
      $scope.facebookAuth = function(){
        if (Lang.get() == 'fr') {
          alert('Pour vous connecter avec facebook, merci d\'utiliser Safari.');
        }
        else  {
          alert('For sign-in with Facebook, please use Safari.');
        }
      };
    }

    var hash = location.href.split('code=');
    if (hash.length > 1) {
      $scope.loading = true;

      var process = function(){
        logoutPromise.then(function() {
          User.facebookAuth(hash[1].split('#')[0])
            .then(function () {
              Cart.reload();
              var back = User.getBackPath();
              location.href = back;
            }, function (error) {
              $scope.loading = false;
              $scope.error = error;
            });
        });
      };

      if (!window.FB) {
        window.fbAsyncInit = function() {
          window._initFb();
          process();
        };
      }
      else{
        process();
      }
    }

  });
