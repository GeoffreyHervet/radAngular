'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:smartBanner
 * @description
 * # smartBanner
 */
angular.module('angularApp')
  .directive('smartBanner', function (Lang, $translate) {
    return {
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        $translate(['app.free', 'app.android', 'app.view']).then(function(vals){
          console.log(vals);
          new SmartBanner({
            //daysHidden: 15
            //daysReminder: 90
            appStoreLanguage: Lang.get(), // language code for the App Store (defaults to user's browser language)
            title: 'Rad',
            author: 'Rad.co',
            button: vals['app.view'],
            store: {
              android: vals['app.android']
              //,ios: 'On the App Store'
            },
            price: {
              android: vals['app.free']
              //,ios: 'FREE'
            }
            //, force: 'android' // Uncomment for platform emulation
          });
        });
      }
    };
  });
