'use strict';

/**
 * @ngdoc service
 * @name angularApp.Product
 * @description
 * # Product
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('Product', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
