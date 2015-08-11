'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:videoPlayer
 * @description
 * # videoPlayer
 */
angular.module('angularApp')
  .directive('videoPlayer', function () {
    return {
      restrict: 'A',
      scope: {
        videoPlayer: '@'
      },
      link: function postLink(scope, element, attrs) {
        element.click(function(e){
          e.preventDefault();
          var poster = element.find('img').attr('src');
          console.log(scope.videoPlayer);
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
