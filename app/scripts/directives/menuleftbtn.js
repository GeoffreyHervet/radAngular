'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:menuLeftBtn
 * @description
 * # menuLeftBtn
 */
angular.module('angularApp')
  .directive('menuLeftBtn', function (User, $rootScope, Cart) {
    var html = angular.element('html');
    $rootScope.$on('$routeChangeStart', function () {
      html.removeClass('left-open');
    });

    return {
      templateUrl: 'views/directives/menuleftbtn.html',
      restrict: 'E',
      link: function postLink(scope, element) {
        scope.nbProduct = null;
        scope.User = User;
        element
          .find('.left-menu-opener')
          .click(function (e) {
            e.preventDefault();
            if (scope.nbProduct === null) {
              Cart.getNbProduct().then(function(val){
                scope.nbProduct = val;
              });
            }
            html.toggleClass('left-open');
          })
        ;

        angular.element('[data-close-menu-left] a').click(function(){
          html.toggleClass('left-open');
        });
      }
    };
  });
