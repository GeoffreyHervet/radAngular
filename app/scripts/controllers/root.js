'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:RootCtrl
 * @description
 * # RootCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('RootCtrl', function ($scope, $translate, $stateParams, $state, Lang, Configuration, $http) {
    if (!$stateParams.store) {
      $http.get('/getlocale.php').then(function(response){
        return $state.go('app.store', {store: response.data});
      }, function(){
        return $state.go('app.store', {store: 'fr'});
      });
    }
    if ($stateParams.store != $translate.use()) {
      $scope.activeLang = $stateParams.store;
      Lang.set($scope.activeLang);
      $translate.use($scope.activeLang);
      angular.element('.modal-backdrop.in').remove();
    }
  });
