'use strict';

/**
 * @ngdoc service
 * @name angularApp.Cart
 * @description
 * # Cart
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('Cart', function (LocalStorage, User, ApiLink, MagentoPostRequest, $q, Utils, $http) {
    //var _cart = LocalStorage.getObject('cart') || null;
    var _cart = null;
    var _nbProduct = 0;

    var addProduct = function (id, qty, attributes) {
      return $q(function(resolve, reject) {
        User
          .getToken(true)
          .then(function(token){
            MagentoPostRequest(
              ApiLink.get('cart', 'add'),
              angular.extend({product: id, qty: qty}, attributes),
              token
            ).then(function(response) {
                if (response.data.order) {
                  updateCart(response.data.order)
                }
                resolve(_cart);
              }, function(){
                return reject('error.connexion_lost');
              })
            ;
          }, function() {
            return reject('error.connexion_lost');
          });
      });
    };

    var clearXml = function(cart) {
      cart.products.group = Utils.arraytizer(cart.products.group);
      angular.forEach(cart.products.group, function(v,k){
        cart.products.group[k].items.item = Utils.arraytizer(cart.products.group[k].items.item);
      });

      return cart;

    };

    var updateCart = function(cart) {
      if (cart == null) {
        return _nbProduct = 0;
      }

      cart = clearXml(cart);
      _nbProduct = 0;
      LocalStorage.putObject('cart', cart, 10 * 60);
      _cart = cart
    };

    var getProducts = function(){
      return _cart;
    };

    var getNbProduct = function(){
      if (_nbProduct < 1) {
        _nbProduct = 0;
        if (_cart != null) {
          angular.forEach(_cart.products.group, function (g) {
            _nbProduct += g.items.item.length
          });
        }
      }

      return _nbProduct;
    };

    var refresh = function(){
      console.log('REFRESH');
      return $q(function(resolve, reject) {
        User
          .getToken(true)
          .then(function(){
            $http({
              method: 'GET',
              url: ApiLink.get('checkout', 'orderreview')
            })
              .then(function(response) {
                if (response.data.order) {
                  updateCart(response.data.order)
                }
                resolve(_cart);
              }, function(){
                return reject('error.connexion_lost');
              })
            ;
          }, function() {
            return reject('error.connexion_lost');
          });
      });
    };

    var isInit = function(){
      return _cart != null;
    };

    updateCart(_cart);
    return {
      isInit:       isInit,
      addProduct:   addProduct,
      getProducts:  getProducts,
      getNbProduct: getNbProduct,
      refresh:      refresh
    };
  });
