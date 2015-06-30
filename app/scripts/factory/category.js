'use strict';

/**
 * @ngdoc service
 * @name angularApp.category
 * @description
 * # category
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('Category', function ($http, responseHandler, ApiLink, LocalStorage, $q) {
    var _get = function(id, page) {
      return $q(function(resolve, reject) {
        var key = 'catalog/category/' + id + '-' + page;
        var ret = LocalStorage.getObject(key);
        if (ret) {
          return resolve(ret);
        }

        var count, offset;
        if (page < 1) {
          count = 6;
          offset = 0;
        }
        else {
          count = 20;
          offset = (page - 1) * 20 + 6;
        }

        responseHandler
          .handle($http({
            method: 'GET',
            url: ApiLink.get('catalog', 'category', {id: id, count: count, offset: offset})
          }))
          .then(function(response) {
            if (response.category) {
              LocalStorage.putObject(key, response.category, 60 * 5);
              return resolve(response.category);
            }
            reject(null);
          }, function() {
            reject(null);
          });
      });
    };

    return {
      'get': _get
    };
  });
