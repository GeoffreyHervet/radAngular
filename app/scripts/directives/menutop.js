'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:menuTop
 * @description
 * # menuTop
 */
angular.module('angularApp')
  .directive('menuTop', function () {
    return {
      templateUrl: 'views/directives/menutop.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
