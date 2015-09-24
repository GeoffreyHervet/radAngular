'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:smartBanner
 * @description
 * # smartBanner
 */
angular.module('angularApp')
  .directive('smartBanner', function (Lang, $translate, Configuration, $timeout, Utils) {
    return {
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var initBanner = function initBanner(config){
          try {
            var baseConfig = config.smart_banner[Utils.isIOS() ? 'ios' : 'android'];
            if (baseConfig._enabled != '1') {
              return;
            }
            var bannerConfig = {
              //daysHidden: 15,
              //daysReminder: 90,
              appStoreLanguage: Lang.get(),
              title: baseConfig._title,
              author: baseConfig._subtitle,
              button: baseConfig._action,
              price: {
                android: baseConfig._price,
                ios: baseConfig._price
              },
              store: {
                android: baseConfig._platform,
                ios: baseConfig._platform
              }
              //,force: 'android'
            };

            new SmartBanner(bannerConfig);
          }
          catch (e) {
            console.error(e);
          }

        };

        var waiter = function(){
          if (Configuration.done()) {
            initBanner(Configuration.data());
          }
          else {
            $timeout(waiter);
          }
        };

        waiter();
      }
    };
  });
