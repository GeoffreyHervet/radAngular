'use strict';

/**
 * @ngdoc service
 * @name angularApp.responseHandler
 * @description
 * # responseHandler
 * Service in the angularApp.
 */
angular.module('angularApp')
  .service('responseHandler', function ($q) {
    var success = function(response, callback){
      if (typeof response.data === 'object') {
        if (response.data.message && response.data.message.status == 'error') {
          return $q.reject(response.data.message.text);
        }
        if (typeof callback === 'function') {
          callback(response);
        }
        return response.data;
      } else {
        return $q.reject(response.data);
      }
    };

    var error = function(response) {
      $q.reject(response.data);
    };

    var handle = function($httpRequest){
      return $httpRequest.then(success, error);
    };

    return {
      success: success,
      error: error,
      handle: handle
    }
  });
