'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:splashScreen
 * @description
 * # splashScreen
 */
angular.module('angularApp')
  .directive('splashScreen', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        angular.element(document).ready(function(){
          $timeout(function(){
            element.remove();
          }, 500);
        });
      }
    };
  });
