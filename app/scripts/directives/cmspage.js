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
        content: '=cmsPage'
      },
      restrict: 'A',
      link: function postLink(scope, element) {
        scope.$watch('content', function(){
          var $el = jQuery(element[0]);

          $el.find('a').each(function() {
            var $link = jQuery(this);
            $link.data('target', $link.attr('href'));
            $link.attr('href', 'javascript:;');

            $link.click(function(e){
              var link = jQuery(this);
              e.preventDefault();
              e.stopPropagation();

              try {
                jQuery('html,body').animate({scrollTop: jQuery(link.data('target')).offset().top}, 'slow');
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
