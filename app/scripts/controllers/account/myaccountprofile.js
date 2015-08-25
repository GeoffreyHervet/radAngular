'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountProfileCtrl
 * @description
 * # MyAccountProfileCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountProfileCtrl', function ($scope, User, $timeout, Lang) {
    if (!User.isLoggued()) {
      User.goToLogin();
    }

    switch (Lang.get()) {
      case 'de':
        $scope.cgvSlug = 'agb';
        break;
      case 'uk':
        $scope.cgvSlug = 'terms-and-conditions';
        break;
      case 'us':
      case 'fr':
      default:
        $scope.cgvSlug = 'conditions-generales-de-vente';
        break;
    }
    $scope.success = null;
    $scope.loading = true;
    $scope.loadingNewsletter = true;
    $scope.title = 'myaccount.profile.title';
    $scope.user = null;
    var first = true;

    User
      .getInfos(true)
      .then(function(data){
        $scope.loading = false;
        $scope.user = data;
        $scope.user.newsletter = !!parseInt($scope.user.newsletter.is_subscribed);

        $timeout(function(){
          $scope.$watch('user.newsletter', function(val){
            if (first) {
              return first = false;
            }
            User.updateNewsletter(val);
          });
        });

      }, function(e){
        $scope.loading = false;
        $scope.error = e;
      })
    ;

    $scope.submitForm = function(){
      $scope.loading = true;
      User
        .updateName($scope.user.firstname, $scope.user.lastname)
        .then(function(msg){
          $scope.success = msg;
          $scope.loading = false;
          $scope.error = null;
          $timeout(function(){
            $scope.success = null;
          }, 5000);
        }, function(error){
          $scope.loading = false;
          $scope.error = error;
        })
      ;
    };

  });
