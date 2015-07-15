'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:SearchBtn
 * @description
 * # SearchBtn
 */
angular.module('angularApp')
  .directive('searchBtn', function ($location) {
    return {
      templateUrl: 'views/directives/search-btn.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.searchValue = '';
        var el = element.find('.right-menu-opener');
        var form = element.find(el.attr('href'));
        el
          .click(function(e){
            form.show();
            form.find('input').focus();
            e.preventDefault();
            return false;
          })
        ;
        form
          .find('.close-btn')
          .click(function(e){
            e.preventDefault();
            form.hide();
            return false;
          })
        ;

        scope.goToSearch = function(){
          $location.path('/search').search({q: scope.searchValue});
          return false;
        };
      }
    };
  });
