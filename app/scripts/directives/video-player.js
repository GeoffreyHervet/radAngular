'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:videoPlayer
 * @description
 * # videoPlayer
 */
angular.module('angularApp')
  .directive('videoPlayer', function ($timeout) {
    return {
      restrict: 'A',
      scope: {
        videoPlayer: '@',
        masterLoader: '='
      },
      link: function postLink(scope, element, attrs) {
        element.click(function(e){
          scope.$apply(function(){
            scope.masterLoader.val = true;
          });
          $timeout(function(){
            scope.$apply(function(){
              scope.masterLoader.val = false;
            });
          }, 3000);
          e.preventDefault();
          var poster = element.find('img').attr('src');
          angular.element('#videoPlayerVideo').remove();
          angular
            .element('body')
            .append('<div class="player-video" id="videoPlayerVideo">' +
              '<video poster="'+ poster +'" controls preload="auto" x-webkit-airplay crossorigin="anonymous" src="' + scope.videoPlayer + '">' +
                '<source src="'+ scope.videoPlayer+'">' +
              '</video>' +
            '</div>')
          ;
          angular.element('#videoPlayerVideo video')[0].play();
        });
      }
    };
  });
