'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountFreeOrdersCtrl
 * @description
 * # MyAccountFreeOrdersCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountFreeOrdersCtrl', function ($scope, User) {
    if (!User.isLoggued()) {
      User.goToLogin();
    }

    $scope.loading = true;
    $scope.title = 'myaccount.profile.free_order.title';
    $scope.user = null;
    $scope.email = '';
    $scope.password = '';
    $scope.translateData = {email: $scope.email};

    User
      .getInfos()
      .then(function(data){
        $scope.loading = false;
        $scope.user = data;

      //  "sms": "Partager par message", // sms:+15105550101?body=hello%20there
      //    "whatsapp": "Partager par whatsApp", // <a href="whatsapp://send?text=Hello%20World!">Hello, world!</a>
      //    "facebook": "Partager par facebook" // https://developers.facebook.com/docs/sharing/reference/share-dialog
      }, function(e){
        $scope.loading = false;
        $scope.error = e;
      })
    ;
  });
