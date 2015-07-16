'use strict';

/**
 * @ngdoc service
 * @name angularApp.Lang
 * @description
 * # Lang
 * Service in the angularApp.
 */
angular.module('angularApp')
  .service('Lang', function (ENV, $cookies) {
    var allowedLang = 'fr us uk de'.split(' ');
    var currentLang = $cookies.get('lang') || ENV.defaultLang;

    var getCurrentLang = function(){
      return currentLang;
    };

    var setCurrentLang = function(lang){
      lang = lang.toLowerCase();
      for (var i = 0; i < allowedLang.length; i++) {
        if (allowedLang[i] === lang.toLowerCase()) {
          currentLang = lang;
          break;
        }
      }

      return currentLang;
    };

    var getCurrency = function(){
      switch (currentLang) {
        case 'us':
          return 'USD';
          break;
        case 'uk':
          return 'GBP';
          break;
        case 'fr':
        case 'de':
        default:
          return 'EUR';
          break;
      }
    };

    return {
      'get': getCurrentLang,
      'set': setCurrentLang,
      getCurrency: getCurrency,
      getAppCode: function(){ return 'fr_iph1'; }
    };
  });
