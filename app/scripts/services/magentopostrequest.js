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
    return function(url, data) {
      return $http({
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $httpParamSerializer(data)
      })
    };
  });
