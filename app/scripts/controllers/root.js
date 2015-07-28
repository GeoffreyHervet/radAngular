'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:RootCtrl
 * @description
 * # RootCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('RootCtrl', function ($scope, $translate, $stateParams, $state) {
    if (!$stateParams.store) {
      return $state.go('app.store', {store: 'fr'});
    }
    $scope.activeLang = $stateParams.store;
    $translate.use($scope.activeLang);
  });
