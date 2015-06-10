'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:loader
 * @description
 * # loader
 */
angular.module('angularApp')
  .directive('loader', function () {
    return {
      template: '<div class="loader-directive"><div class="loader"></div></div>',
    };
  });
