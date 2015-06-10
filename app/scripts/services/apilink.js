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
    var getLink = function(controller, action) {
      return ENV.apiEndpoint + '/' + Lang.get() + '/xmlconnect/' + controller + '/' + action + '/app_code/' + Lang.getAppCode();
    };
    return {
      'get': getLink
    };
  });
