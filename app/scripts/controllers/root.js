'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:RootCtrl
 * @description
 * # RootCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('RootCtrl', function ($scope, $translate, $stateParams, $state, Lang, Configuration, $http, ENV, $cookies, $timeout) {
    var go = function(l) {
      $cookies.remove('login/backpath');
      return $state.go('app.store', {store: l});
    };
    if (!$stateParams.store) {
      if (ENV.name == 'development') {
        return go(ENV.defaultLang);
      }
      else {
        return $http.get('/getlocale.php').then(function(response){
          $timeout(function(){
            return go(response.data);
          }, 100);
        }, function(){
          $timeout(function(){
            return go(ENV.defaultLang);
          });
        });
      }
    }
    if ($stateParams.store != $translate.use()) {
      $scope.activeLang = $stateParams.store;
      Lang.set($scope.activeLang);
      $translate.use($scope.activeLang);
      angular.element('.modal-backdrop.in').remove();
      angular.element('.modal-open').removeClass('modal-open');
    }
  });
