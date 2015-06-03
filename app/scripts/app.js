'use strict';
window.scrollTo(0, 1);

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
  .module('angularApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/account/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function ($translateProvider) {
    var base = {
      TITLE: 'Rad.co', // {{ 'TITLE' | translate }}
      APP_NAME: 'Rad',
      login: {
        'with_facebook': 'Se connecter avec Facebook',
        'or_register_email': 'Connexion ou inscription par e-mail'
      },



      '':''
    };

    var subs = function(trads, hash, base) {
      angular.forEach(hash, function(val, key) {
        if (typeof val === 'string') {
          trads[base + key] = val;
        } else {
          trads = subs(trads, val, base + key + '.');
        }
      });

      return trads;
    };

    $translateProvider.translations('fr', subs({}, base, ''));

    $translateProvider.preferredLanguage('fr');
  })


;
