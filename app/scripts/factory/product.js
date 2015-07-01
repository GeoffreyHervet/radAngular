'use strict';

/**
 * @ngdoc service
 * @name angularApp.Product
 * @description
 * # Product
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('Product', function ($http, responseHandler, ApiLink, LocalStorage, $q, MagentoPostRequest, Utils) {
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
            return reject('error.unknown_reason');
          }, function() {
            return reject('error.connexion_lost');
          });
      });
    };

    var search = function(term, page){
      var count, offset;
      if (page < 1) {
        count = 6;
        offset = 0;
      }
      else {
        count = 20;
        offset = (page - 1) * 20 + 6;
      }

      return $q(function(resolve, reject){
        MagentoPostRequest(
          ApiLink.get('catalog', 'search', {count: count, offset: offset}),
          {query: term}
        ).then(function(response){
            if (response.data.search && response.data.search.products) {
              return resolve(Utils.arrayfy(response.data.search.products.item));
            }
            if (response.data.search) {
              return resolve([]);
            }
            return reject('error.unknown_reason');
          },
          function(){
            return reject('error.connexion_lost');
          })
      });
    };

    return {
      'get':  _get,
      search: search
    };
  });
