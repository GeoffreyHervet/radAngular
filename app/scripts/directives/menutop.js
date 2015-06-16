'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:menuTop
 * @description
 * # menuTop
 */
angular.module('angularApp')
  .directive('menuTop', function ($http, MenuCategories) {
    return {
      templateUrl: 'views/directives/menutop.html',
      restrict: 'E',
      link: function postLink(scope) {
        scope.categories = null;
        MenuCategories().then(function(categories) {
          scope.categories = categories;
          var menu = null;
          scope.toggleMenuState = function() {
            menu = menu || angular.element('#menu-dropdown');
            menu.toggleClass('menu-open');
          };
        });
      }
    };
  });
