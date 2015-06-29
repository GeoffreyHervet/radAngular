'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function ($scope, ApiLink, $cookies, $http, LocalStorage, Utils) {
    $scope.inserts = LocalStorage.getObject('home/inserts');
    $scope.Utils = Utils;

    if (!$scope.inserts) {
      $scope.loading = true;
      $http
        .get(ApiLink.getApiBase() + '/raaad_xmlconnect/index/index/app_code/' + ApiLink.getAppCode() + '/level/1')
        .then(function(response) {
          $scope.loading = false;
          if (response.data && response.data.home && response.data.home.inserts) {
            $scope.inserts = response.data.home.inserts.insert;
            LocalStorage.putObject('home/inserts', $scope.inserts);
          }
        }, function() {
          $scope.loading = false;
        })
      ;
    }
  });
