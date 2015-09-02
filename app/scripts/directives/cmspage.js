'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:cmsPage
 * @description
 * # cmsPage
 */
angular.module('angularApp')
  .directive('cmsPage', function () {
    return {
      scope: {
        cmsPage: '='
      },
      restrict: 'A',
      link: function postLink(scope, element) {
        scope.$watch('cmsPage', function(val){
          if (!val) {
            return ;
          }
          element.html(val.replace(/<a name="([a-z]+)"><\/a>/gi, '<div id="$1"></div>'));

          var $el = jQuery(element[0]);

          $el.find('a[href^=#]').each(function() {
            var $link = jQuery(this);
            var selector = $link.attr('href');
            var target = angular.element(selector);
            if (!target.length) {
              return ;
            }

            $link.data('target', target).css('color', 'red');

            console.log($link);
            $link.click(function(e){
              e.preventDefault();
              e.stopPropagation();

              try {
                window.target = $(this).data('target');
                jQuery('html,body').animate({scrollTop: $(this).data('target').offset().top - 65}, 'slow');
              } catch (e) {
                console.error('target en carton');
              }

              return false;
            });
          });
        });
      }
    };
  });
