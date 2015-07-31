'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyOrdersCtrl
 * @description
 * # MyOrdersCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyOrdersCtrl', function ($scope, User, order, Utils) {
    console.log('OK');
    if (!User.isLoggued()) {
      return User.goToLogin();
    }

    $scope.loading = true;
    $scope.orders = [];
    $scope.error = false;
    $scope.no_orders = false;
    $scope.title = 'myaccount.myorders.title';

    order.list().then(
      function (response){
        $scope.no_orders = false;
        $scope.loading = false;
        if (response.message && response.message.status === 'error') {
          if (response.message.logged_in === '0') {
            return User.goToLogin();
          }
          return $scope.error = response.message.text;
        }
        if (response.orders && response.orders.item) {
          return $scope.orders = Utils.arrayfy(response.orders.item);
        }
        $scope.no_orders = true;
      },
      function (){
        $scope.loading = false;
        $scope.error = 'error.connexion_lost';
      }
    );


  });
