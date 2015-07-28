'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CmsPageCtrl
 * @description
 * # CmsPageCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CmsPageCtrl', function ($scope, $stateParams, Cms) {
    $scope.loading = true;
    $scope.slug = $stateParams.slug;
    $scope.title = $stateParams.slug.split('-').join(' ').toUpperCase();

    $scope.content = '';

    Cms
      .get($stateParams.slug)
      .then(function(html){
        $scope.content = html;
        $scope.loading = false;
      }, function(e){
        $scope.error = e;
        $scope.loading = false;
      })
    ;
  });
