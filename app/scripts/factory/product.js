'use strict';

/**
 * @ngdoc service
 * @name angularApp.Product
 * @description
 * # Product
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('Product', function ($http, responseHandler, ApiLink, LocalStorage, $q) {
    var _get = function(id) {
      return $q(function(resolve, reject) {
        var key = 'catalog/product/' + id;
        var ret = LocalStorage.getObject(key);
        if (ret) {
          return resolve(ret);
        }

        responseHandler
          .handle($http({
            method: 'GET',
            url: ApiLink.get('catalog', 'product', {id: id})
          }))
          .then(function(response) {
            if (response.product && response.product.name) {
              LocalStorage.putObject(key, response.product, 60 * 5);
              return resolve(response.product);
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
