'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:RootCtrl
 * @description
 * # RootCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('RootCtrl', function ($scope, $translate, $stateParams, $state, Lang, Configuration, $http, ENV, $cookies) {
    console.log($stateParams.store);
    var go = function(l) {
      $cookies.remove('login/backpath');
      $cookies.put('login/backpath', location.href, 60 * 60 * 24);
      return $state.go('app.store', {store: l});
    };
    if (!$stateParams.store) {
      if (ENV.development == 'development') {
        return go(ENV.defaultLang);
      }
      else {
        return $http.get('/getlocale.php').then(function(response){
          if (response.data.length > 2) {
            response.data = ENV.defaultLang;
          }
          return go(response.data);
        }, function(){
          return go(ENV.defaultLang);
        });
      }
    }
    if ($stateParams.store != $translate.use()) {
      $scope.activeLang = $stateParams.store;
      Lang.set($scope.activeLang);
      $translate.use($scope.activeLang);
      angular.element('.modal-backdrop.in').remove();
    }
  });
