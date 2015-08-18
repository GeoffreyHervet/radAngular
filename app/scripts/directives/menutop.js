'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:menuTop
 * @description
 * # menuTop
 */
angular.module('angularApp')
  .directive('menuTop', function ($http, MenuCategories, Utils, $timeout, $state, $translate, Lang) {
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

          $translate(menuTitle).then(function (titleTranslated) {
            angular.element(window.document)[0].title = 'Rad.co | ' + titleTranslated;
          }, function (titleTranslated) {
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

        var updateCategories = function(){
          MenuCategories().then(function(categories) {
            scope.categories = categories;
          });
        };
        updateCategories();
        Lang.onChange(updateCategories);

        scope.goBack = function(){
          if ($state.$current.name == 'app.cart.confirm') {
            return $state.go('app.store');
          }
          try {
            $state.go($state.$current.parent.name == 'app'  ? $state.$current.name.split('.').slice(0,-1).join('.') : '^');
          } catch (e) {
            $state.go('app.store');
          }
        };
      }
    };
  });
