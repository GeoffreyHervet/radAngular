'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function ($scope, ApiLink, $cookies, $http, LocalStorage, Utils, $state, Configuration, Lang) {
    $scope.inserts  = LocalStorage.getObject('home/inserts');
    $scope.carousels = LocalStorage.getObject('home/carousel');
    $scope.Utils = Utils;
    $scope.isLoading = {val: false};

    $cookies.put('login/backpath', '#/' + Lang.get(), 24*3600);

    if (!$scope.inserts && !$scope.carousels) {
      $scope.loading = true;
      $http
        .get(ApiLink.getApiBase() + '/raaad_xmlconnect/index/index/app_code/' + ApiLink.getAppCode() + '/level/1')
        .then(function(response) {
          $scope.loading = false;
          if (response.data && response.data.home && response.data.home.inserts) {
            $scope.inserts = Utils.arrayfy(response.data.home.inserts.insert);
            $scope.carousels = Utils.arrayfy(response.data.home.carousel.insert);
            LocalStorage.putObject('home/inserts', $scope.inserts);
            LocalStorage.putObject('home/carousel', $scope.carousels);
          }
        }, function() {
          $scope.loading = false;
        })
      ;

    }
  });
