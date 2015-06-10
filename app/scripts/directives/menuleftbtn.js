'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:menuLeftBtn
 * @description
 * # menuLeftBtn
 */
angular.module('angularApp')
  .directive('menuLeftBtn', function (User, $rootScope) {
    var html = angular.element('html');
    $rootScope.$on('$routeChangeStart', function () {
      html.removeClass('left-open');
    });

    return {
      templateUrl: 'views/directives/menuleftbtn.html',
      restrict: 'E',
      link: function postLink(scope, element) {
        var toggler = element.find('.left-menu-opener');

        if (!User.getToken()) {
          toggler.attr('href', '#/login');
        }
        else {
          toggler
            .click(function(e) {
              e.preventDefault();
              html.toggleClass('left-open');
            })
          ;
        }
      }
    };
  });
