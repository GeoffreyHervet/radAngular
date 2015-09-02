'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:radRnFix
 * @description
 * # radRnFix
 */
angular.module('angularApp')
  .directive('radRnFix', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        var setSizes = function($ul) {
          var height = $ul.find('img').css('width', '100%').eq(0).height();
          if (!height) {
            height = 580;
          }
          $ul.height(height);
        };
        element.bind('load', function() {
          setSizes(element.closest('ul[rn-carousel]'));
        });
        angular.element('body').on('resize', function(){
          setSizes(element.closest('ul[rn-carousel]'));
        });
      }
    };
  });
