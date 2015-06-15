'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyOrdersCtrl
 * @description
 * # MyOrdersCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyOrdersCtrl', function ($scope, User, $location, order) {
    if (!User.getToken()) {
      return $location.path('/login');
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
          return $scope.error = response.message.text;
        }
        if (response.orders && response.orders.item) {
          return $scope.orders = response.orders.item;
        }
        $scope.no_orders = true;
      },
      function (){
        $scope.loading = false;
        $scope.error = 'error.connexion_lost';
      }
    );


  });
