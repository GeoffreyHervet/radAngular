'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:cartBtn
 * @description
 * # cartBtn
 */
angular.module('angularApp')
  .directive('cartBtn', function (Cart, $location) {
    return {
      template: '<div class="cart-icon-top"><span>{{nbProduct}}</span></div>',
      restrict: 'E',
      link: function postLink(scope, element) {
        scope.nbProduct = null;
        Cart.getNbProduct().then(function(val){
          scope.nbProduct = val;
        });
        element.click(function(){
          $location.path('/cart')
        });
      }
    };
  });
