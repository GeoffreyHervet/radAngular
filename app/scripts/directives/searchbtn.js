'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:SearchBtn
 * @description
 * # SearchBtn
 */
angular.module('angularApp')
  .directive('searchBtn', function ($state) {
    return {
      templateUrl: 'views/directives/search-btn.html',
      restrict: 'E',
      link: function postLink(scope, element) {
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
          $state.go('app.store.search', {q: scope.searchValue});
          return false;
        };
      }
    };
  });
