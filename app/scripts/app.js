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
    //'ngRoute',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'xml',
    'config',
    'nl2br',
    'infinite-scroll',
    'uiSwitch',
    'payment',
    'angular-carousel',
    'angular-google-analytics'
  ])
  //.config(function($locationProvider){
    //$locationProvider.html5Mode(true);
  //})
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('xmlHttpInterceptor');
  })
  .config(function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|sms|whatsapp|twitter|mailto|file):/);
  })
  .config(function ($translateProvider) {
    $translateProvider.preferredLanguage('fr');
    $translateProvider.useSanitizeValueStrategy(null);
  })
  .config(function(AnalyticsProvider){
    AnalyticsProvider.setAccount('UA-31344840-2');
    AnalyticsProvider.setDomainName('m.rad.co');
    //AnalyticsProvider.ignoreFirstPageLoad(true);
    AnalyticsProvider.useECommerce(true, true);
    AnalyticsProvider.setPageEvent('$stateChangeSuccess');
  })
;
