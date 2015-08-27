'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:SuccessCtrl
 * @description
 * # SuccessCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('SuccessCtrl', function ($scope, LocalStorage, User, order, $translate, Utils, $state) {
    $scope.title = 'cart.success';
    $scope.orderId = LocalStorage.get('order_id');
    $scope.num     = LocalStorage.get('increment_id');

    //$scope.orderId = 574970;
    //$scope.num     = 100449431;

    $scope.success    = true;
    $scope.loading    = true;
    $scope.order      = null;
    $scope.error      = false;
    $scope.Utils      = Utils;

    $scope.items      = [];
    $scope.totals     = [];

    LocalStorage.remove('go_detail_cart');
    LocalStorage.put('go_detail_cart', 0);
    LocalStorage.clear();

    if (!$scope.orderId) {
      $state.go('app.my-account.orders');
    }

    order.get($scope.orderId).then(
      function (response){
        if (response.message && response.message.status === 'error') {
          $scope.loading = false;
          return $scope.error = response.message.text;
        }
        if (response.order_details) {
          $scope.order = response.order_details;
          $scope.items = Utils.arrayfy($scope.order.ordered_items.item);
          $scope.ids = [];
          angular.forEach($scope.items, function(item){
            $scope.ids.push(item._product_id);
          });
          $scope.totals = [];
          angular.forEach($scope.order.totals, function(v) {
            if (v.summary) v = v.summary;
            $scope.totals.push({label: v._label, val: v.__text});
          });
          $scope.loading = false; // here for tracking
          return ;

        }
        $scope.error = 'error.connexion_lost';
        $scope.loading = false;
      },
      function (){
        $scope.loading = false;
        $scope.error = 'error.connexion_lost';
      }
    );

    $scope.sameAddresses = function(a,b) {
      if (a.entity_id.__text == b.entity_id.__text) {
        return true;
      }
      return a.city.__text == b.city.__text &&
        a.country.__text == b.country.__text &&
        a.country_id.__text == b.country_id.__text &&
        a.firstname.__text == b.firstname.__text &&
        a.lastname.__text == b.lastname.__text &&
        a.postcode.__text == b.postcode.__text &&
        a.street1.__text == b.street1.__text &&
        a.street.__text == b.street.__text &&
        a.telephone.__text == b.telephone.__text;
    }

  });
