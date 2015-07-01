'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CmsPageCtrl
 * @description
 * # CmsPageCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CmsPageCtrl', function ($scope, $routeParams, Cms) {
    $scope.loading = true;
    $scope.title = $routeParams.slug.split('-').join(' ').toUpperCase();

    $scope.content = '';

    Cms
      .get($routeParams.slug)
      .then(function(html){
        $scope.content = html;
        $scope.loading = false;
      }, function(e){
        $scope.error = e;
        $scope.loading = false;
      })
    ;
  });
