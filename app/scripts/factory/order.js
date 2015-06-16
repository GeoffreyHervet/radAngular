'use strict';

/**
 * @ngdoc service
 * @name angularApp.order
 * @description
 * # order
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('order', function (User, $http, responseHandler, ApiLink) {
    var listOrders = function() {
      return responseHandler.handle(
        $http({
          method: 'GET',
          url: ApiLink.get('customer', 'orderlist')
        })
      );
    };

    var getOrder = function(id) {
      return responseHandler.handle(
        $http({
          method: 'GET',
          url: ApiLink.get('customer', 'orderdetails', {order_id: id})
        })
      );
    };

    return {
      list:   listOrders,
      'get':  getOrder
    };
  });
