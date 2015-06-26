'use strict';

/**
 * @ngdoc service
 * @name angularApp.Cart
 * @description
 * # Cart
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('Cart', function (User, $q, ApiLink, $http, MagentoPostRequest, LocalStorage, Utils) {
    var _cartDetails = LocalStorage.getObject('checkout/orderreview');
    var queueNotify = [];

    var setDetails = function(val){
      _cartDetails = val;
      LocalStorage.putObject('checkout/orderreview', val);
      _sendUpdateNotif();
      return _cartDetails;
    };

    var _sendUpdateNotif = function(){
      angular.forEach(queueNotify, function(callback){
        callback();
      });
    };

    var notifyUpdate = function(callback){
      queueNotify.push(callback);
    };

    var isInit = function(){
      return _cartDetails !== null;
    };

    var getDetails = function(forceReload){
      return $q(function(resolve, reject){
        if (forceReload === true || _cartDetails === null) {
          return reload().then(function(){
            resolve(_cartDetails);
          }, function(error){
            reject(error);
          });
        }
        return resolve(_cartDetails);
      });
    };

    var getFormattedDetails = function() {
      var ret = {groups: [], items: [], totals: _cartDetails.totals, empty: !_cartDetails.products};

      if (!ret.empty) {
        angular.forEach(Utils.arrayfy(_cartDetails.products.group), function (group) {
          var gr = [];
          angular.forEach(Utils.arrayfy(group.items.item), function (item) {
            item.options.option = Utils.arrayfy(item.options.option);
            gr.push(item);
            ret.items.push(item);
          });

          ret.groups.push(gr);
        });
      }
      return ret;
    };

    var reload = function(){
      return $q(function(resolve, reject){
          User
            .getToken(true)
            .then(function() {
              return $http({
                url: ApiLink.get('checkout', 'orderreview'),
                method: 'GET',
                headers: {
                  'Authorization': 'token="' + User.getToken() + '"'
                }
              })
                .then(function(response) {
                  if (response.data.order && response.data.order) {
                    setDetails(response.data.order);
                    return resolve(response.data.order);
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
                else if (response.data.message) {
                  return reject(response.data.message.text);
                }
                return reject(null);
              }, function(){
                return reject(null);
              })
            ;
          });
      });
    };

    var getNbProduct = function(fromCache){
      var value = function() {
        var nb = 0;
        var details = getFormattedDetails();
        if (details.empty) {
          return 0;
        }
        angular.forEach(Utils.arrayfy(details.items), function(item) {
          nb += parseInt(item.qty);
        });

        return nb;
      };
      if (isInit() && fromCache) {
        return value();
      }
      if (fromCache) {
        return null;
      }
      return $q(function(resolve, reject){
        getDetails().then(function(){
          return resolve(value());
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
      getDetails:   getDetails,
      isInit:       isInit,
      notifyUpdate: notifyUpdate,
      getFormattedDetails: getFormattedDetails
    };
  });
