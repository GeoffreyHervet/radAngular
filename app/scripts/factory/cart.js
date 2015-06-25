'use strict';

/**
 * @ngdoc service
 * @name angularApp.Cart
 * @description
 * # Cart
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('Cart', function (User, $q, ApiLink, $http, MagentoPostRequest) {
    var _cartDetails = null;

    var setDetails = function(val){
      _cartDetails = val;
      return _cartDetails;
    };

    var getDetails = function(forceReload){
      return $q(function(resolve, reject){
        if (forceReload === true || _cartDetails === null) {
          console.log('before reload #getDetails');
          return reload().then(function(){
            console.log('ICI #getDetails');
            resolve(_cartDetails);
          }, function(error){
            reject(error);
          });
        }
        return resolve(_cartDetails);
      });
    };

    var reload = function(){
      return $q(function(resolve, reject){
          User
            .getToken(true)
            .then(function() {
              return $http({
                url: ApiLink.get('cart', 'info'),
                method: 'GET',
                headers: {
                  'Authorization': 'token="' + User.getToken() + '"'
                }
              })
                .then(function(response) {
                  console.log(response);
                  if (response.data.order && response.data.order.message) {
                    setDetails(response.data.order);
                    return resolve(response.data.order.message);
                  }
                  return reject(null);
                }, function(){
                  return reject(null);
                })
                ;
            }, function() {
              return reject(null);
            }
          );
      });
    };

    var addProduct = function(prodId, qty, opts) {
      return $q(function(resolve, reject) {
        User
          .getToken(true)
          .then(function(){
            var data = angular.copy(opts);
            data.product = prodId;
            data.qty = qty;
            MagentoPostRequest(
              ApiLink.get('cart', 'add'),
              data,
              User.getToken()
            )
              .then(function(response) {
                if (response.data.order && response.data.order.message  && response.data.order.message.text) {
                  if (response.data.order.message.status != 'success') {
                    return reject(response.data.order.message.text);
                  }
                  else {
                    setDetails(response.data.order);
                    return resolve(response.data.order.message.text);
                  }
                }
                return reject(null);
              }, function(){
                return reject(null);
              })
            ;
          });
      });
    };

    var getNbProduct = function(){
      return $q(function(resolve, reject){
        getDetails().then(function(){
          return resolve(parseInt(_cartDetails.products.group.items.item.qty));
        }, function(){
          reject(null);
        });
      });
    };

    return {
      init:         reload,
      reload:       reload,
      addProduct:   addProduct,
      getNbProduct: getNbProduct,
      getDetails:   getDetails
    };
  });
