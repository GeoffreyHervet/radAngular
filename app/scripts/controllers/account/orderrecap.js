'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:OrderRecapCtrl
 * @description
 * # OrderRecapCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('OrderRecapCtrl', function ($scope, $routeParams, User, $location, order, $translate) {
    if (!User.isLoggued()) {
      return User.goToLogin();
    }

    $scope.loading    = true;
    $scope.order      = null;
    $scope.error      = false;
    $scope.title      = '';
    $translate('myaccount.order.title', {id: $routeParams.num}).then(function (translation) {
      $scope.title = translation;
    });

    $scope.items      = [];
    $scope.totals     = [];

    order.get($routeParams.id).then(
      function (response){
        $scope.loading = false;
        if (response.message && response.message.status === 'error') {
          return $scope.error = response.message.text;
        }
        if (response.order_details) {
          $scope.order = response.order_details;
          $scope.items = Array.isArray($scope.order.ordered_items.item) ? $scope.order.ordered_items.item : [$scope.order.ordered_items.item];
          $scope.totals = [];
          angular.forEach($scope.order.totals, function(v) {
            if (v.summary) v = v.summary;
            $scope.totals.push({label: v._label, val: v.__text});
          });
          return ;

        }
        $scope.error = 'error.connexion_lost';
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
