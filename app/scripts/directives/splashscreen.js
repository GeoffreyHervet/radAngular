'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:splashScreen
 * @description
 * # splashScreen
 */
angular.module('angularApp')
  .directive('splashScreen', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        angular.element(document).ready(function(){
          element.remove();
        });
      }
    };
  });
