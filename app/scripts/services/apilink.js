'use strict';

/**
 * @ngdoc service
 * @name angularApp.ApiLink
 * @description
 * # ApiLink
 * Service in the angularApp.
 */
angular.module('angularApp')
  .service('ApiLink', function (ENV, Lang) {
    var getLink = function(controller, action, additionalParams) {
      var add = '';
      if (additionalParams) {
        angular.forEach(additionalParams, function(val, key) {
          add += '/' + encodeURIComponent(key) + '/' + encodeURIComponent(val);
        });
      }
      var path = encodeURIComponent(controller) + '/' + encodeURIComponent(action);
      var scope = isOverridedPath(path) ? 'raaad_xmlconnect' : 'xmlconnect';
      return getApiBase() + '/' + scope + '/' + path + '/app_code/' + getAppCode() + add;
    };

    var getOverridedPaths = function(){
      return [
        'customer/token',
        'cart/index',
        'cart/add',
        'cart/delete',
        'cart/update',

        'checkout/address',

        'stripe/savedcards'
      ];
    };

    var isOverridedPath = function(path){
      return getOverridedPaths().indexOf(path) != -1;
    };

    var getApiBase = function() {
      return ENV.apiEndpoint + '/' + Lang.get();
    };
    var getAppCode = function() {
      return encodeURIComponent(Lang.getAppCode());
    };

    return {
      'get': getLink,
      getApiBase: getApiBase,
      getAppCode: getAppCode
    };
  });
