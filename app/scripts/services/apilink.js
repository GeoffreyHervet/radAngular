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
      return getApiBase() + '/xmlconnect/' + encodeURIComponent(controller) + '/' + encodeURIComponent(action) + '/app_code/' + getAppCode() + add;
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
