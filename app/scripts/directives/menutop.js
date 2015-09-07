'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:menuTop
 * @description
 * # menuTop
 */
angular.module('angularApp')
  .directive('menuTop', function ($http, MenuCategories, Utils, $timeout, $state, $translate, Lang, Configuration) {
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
        scope.banner = {text: ''};
        scope.android_enabled = 0;

        var menu = null;
        scope.toggleMenuState = function() {
          menu = menu || angular.element('#menu-dropdown');
          menu.toggleClass('menu-open');
          angular.element('body').toggleClass('menu-top-open');
        };

        scope.enableScroll = function() {
          angular.element('body').removeClass('menu-top-open');
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

        var updateConfig = function(cfg){
          var style = '';
          if (cfg.banner_font_color) {
            style += 'color:'+cfg.banner_font_color+';';
          }
          if (cfg.banner_background_color) {
            style += 'background-color:'+cfg.banner_background_color+';';
          }
          scope.banner = {
            text:       cfg.banner_text,
            style:      style
          };

          //if (cfg.smart_banner_android) {
            scope.android_enabled = 0; //cfg.smart_banner_android == 1;
          //}
        };

        scope.getCategoryId = function(idx) {
          return parseInt(idx.split('-')[1]);
        };

        var updateCategories = function(){
          MenuCategories().then(function(categories) {
            console.log('categories', categories);
            scope.categories = categories;
          });
          scope.newCategoryId = Lang.getNewId();

          Configuration.reload(updateConfig);
          if (Configuration.done()) {
            updateConfig(Configuration.data());
          }
        };
        updateCategories();
        Lang.onChange(updateCategories);

        scope.goBack = function(){
          if (
            $state.$current.name == 'app.cart.confirm' ||
            $state.$current.name == 'app.my-account.free-orders' ||
            $state.$current.name == 'app.my-account.addresses'
          )
          {
            return $state.go('app.store');
          }


          var currentState = $state.$current.name;
          if (currentState.indexOf('app.cart') != -1) {
            var goTo = null;
            switch (currentState) {
              case 'app.cart':
              case 'app.cart.success':
                goTo = 'app.store';
                break;
              case 'app.cart.payment':
              case 'app.cart.payment.add':
              //goTo = 'app.cart.delivery';
              //break;
              case 'app.cart.edit':
              case 'app.cart.delivery':
              case 'app.cart.delivery.new':
              case 'app.cart.billing':
              case 'app.cart.billing.new':
                goTo = 'app.cart';
                break;
              default: break;
            }
            if (goTo) {
              return $state.go(goTo);
            }
          }

          try {
            //if (history.length) {
            //  return history.go(-1);
            //}
            $state.go($state.$current.parent.name == 'app'  ? $state.$current.name.split('.').slice(0,-1).join('.') : '^');
          } catch (e) {
            $state.go('app.store');
          }
        };
      }
    };
  });
