'use strict';

/**
 * @ngdoc service
 * @name angularApp.MagentoPostRequest
 * @description
 * # MagentoPostRequest
 * Service in the angularApp.
 */
angular.module('angularApp')
  .service('MagentoPostRequest', function ($http, $httpParamSerializer) {

    return function(url, data, token) {
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      if (token) {
        headers.Authorization = 'token="' + token + '"';
      }

      return $http({
        method: 'POST',
        url: url,
        headers: headers,
        data: $httpParamSerializer(data)
      });
    };
  });
