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
      return ENV.apiEndpoint + '/' + Lang.get() + '/xmlconnect/' + encodeURIComponent(controller) + '/' + encodeURIComponent(action) + '/app_code/' + encodeURIComponent(Lang.getAppCode()) + add;
    };
    return {
      'get': getLink
    };
  });
