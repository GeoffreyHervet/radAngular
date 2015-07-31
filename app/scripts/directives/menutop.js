'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:menuTop
 * @description
 * # menuTop
 */
angular.module('angularApp')
  .directive('menuTop', function ($http, MenuCategories, Utils, $timeout, $state, $translate) {
    return {
      templateUrl: 'views/directives/menutop.html',
      restrict: 'E',
      scope:{
        disabledCartFooter: '@',
        menuTitle: '=?',
        backEnabled: '@',
        error: '=?',
        info: '=?',
        product: '@'
      },
      link: function postLink(scope) {
        var timer = null;
        scope.Utils = Utils;
        scope.categories = null;
        scope.disabledCartFooter = scope.disabledCartFooter == 1;
        scope.product = scope.product == 1;

        var menu = null;
        scope.toggleMenuState = function() {
          menu = menu || angular.element('#menu-dropdown');
          menu.toggleClass('menu-open');
        };

        scope.$watch('menuTitle', function(menuTitle) {
          if (menuTitle === 'global.loading' || menuTitle === undefined) {
            return ;
          }
          console.log('OK', menuTitle);
          $translate(menuTitle).then(function (titleTranslated) {
            console.log('menuTitle', menuTitle, titleTranslated);
            angular.element(window.document)[0].title = 'Rad.co | ' + titleTranslated;
          }, function (titleTranslated) {
            console.log('menuTitle', menuTitle, titleTranslated);
            angular.element(window.document)[0].title = 'Rad.co | ' + titleTranslated;
          });
        });
        
        scope.$watch('error', function(val){
          if (!val && timer && timer.cancel){
            timer.cancel(function(){
              timer = null;
            });
          }
          else if (val) {
            timer = $timeout(function(){
              timer = null;
              scope.error = null;
            }, 5000);
          }
          else {
            timer = null;
          }
        });

        MenuCategories().then(function(categories) {
          scope.categories = categories;
        });

        //window.state = $state;
        scope.goBack = function(){
          console.log('parent', $state.$current.parent.name);
          console.log('go', $state.$current.name.split('.').slice(0,-1).join(''));
          try {
            console.log('parent', $state.$current.parent.name);
            console.log('go', $state.$current.name.split('.').slice(0,-1).join(''));
            $state.go($state.$current.parent.name == 'app'  ? $state.$current.name.split('.').slice(0,-1).join('') : '^');
          } catch (e) {
            $state.go('app.store');
          }
        };
      }
    };
  });
