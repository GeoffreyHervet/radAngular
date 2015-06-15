'use strict';

/**
 * @ngdoc service
 * @name angularApp.order
 * @description
 * # order
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('order', function (User, $http, responseHandler) {
    var listOrders = function() {
      return responseHandler.handle(
        $http({
          method: 'GET',
          url: ApiLink.get('customer', 'orderlist')
        })
      );
    };

    return {
      list: listOrders
    };
  });
